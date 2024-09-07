from app.db import db
from app.models.users.users import User


class UserRepository:
    @staticmethod
    def create_user(user):
        created_user = User(**user)
        db.session.add(created_user)
        db.session.commit()
        return created_user

    @staticmethod
    def get_user_by_email(email=None):
        return User.query.filter_by(email=email).first()

    @staticmethod
    def get_user_by_username(username=None):
        return User.query.filter_by(username=username).first()

    @staticmethod
    def get_user_by_id(user_id):
        return User.query.get(user_id)

    @staticmethod
    def update_user(user, data):
        for key, value in data.items():
            setattr(user, key, value)
        db.session.commit()
        return user

    @staticmethod
    def delete_user(user):
        db.session.delete(user)
        db.session.commit()
