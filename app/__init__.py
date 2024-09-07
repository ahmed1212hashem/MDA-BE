from flask import Flask
from flask_jwt_extended.exceptions import NoAuthorizationError, JWTDecodeError, RevokedTokenError
from jwt import ExpiredSignatureError

from app.db import db
from app.config import app_config, authorizations
from app.exceptions.error_handler import handle_error, handle_jwt_errors
from app.marsh import ma
from app.authentication import jwt
from flask_restx import Api
from app.controllers.user.user_controllers import user_namespace
from flask_cors import CORS


def create_app(config_name):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(app_config[config_name])

    jwt.init_app(app)

    db.init_app(app)

    ma.init_app(app)

    api = Api(app, doc='/swagger', authorizations=authorizations, security='Bearer Auth')
    api.add_namespace(user_namespace)
    app.register_error_handler(Exception, handle_error)
    app.register_error_handler(NoAuthorizationError, handle_jwt_errors)
    app.register_error_handler(JWTDecodeError, handle_jwt_errors)
    app.register_error_handler(RevokedTokenError, handle_jwt_errors)
    app.register_error_handler(ExpiredSignatureError, handle_jwt_errors)

    return app, db
