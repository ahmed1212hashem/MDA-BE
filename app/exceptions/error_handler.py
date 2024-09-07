from flask import jsonify
from werkzeug.exceptions import HTTPException


def handle_error(e):
    code = e.code if isinstance(e, HTTPException) else 500
    response = {
        'error': {
            'type': e.__class__.__name__,
            'message': str(e)
        }
    }
    return jsonify(response), code


def handle_jwt_errors(e):
    response = {
        'error': {
            'status': 'error',
            'type': e.__class__.__name__,
            'message': str(e)
        }
    }
    return jsonify(response), 401
