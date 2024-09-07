class Config:
    DEBUG = True
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:guc17308@localhost/dynamic_academy'
    JWT_SECRET_KEY = "k"
    JWT_ALGORITHM = "HS256"


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
    # Other testing-specific configurations


class ProductionConfig(Config):
    # Production-specific configurations
    pass


app_config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig
}

authorizations = {
    'Bearer Auth': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    },
}
