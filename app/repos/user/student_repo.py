from app.db import db
from app.models.users.students import Student
from app.models.users.users import User


class StudentRepository:
    @staticmethod
    def create_student(student):
        created_student = Student(**student)
        db.session.add(created_student)
        db.session.commit()
        return created_student

    @staticmethod
    def get_student_by_user_id(user_id=None):
        return Student.query.filter_by(student_id=user_id).first()

    @staticmethod
    def get_student_by_id(user_id):
        return Student.query.filter_by(user_id=user_id).first()

    @staticmethod
    def update_student(student, data):
        for key, value in data.items():
            setattr(student, key, value)
        db.session.commit()
        return student

    @staticmethod
    def delete_student_by_id(user_id):
        student = Student.query.filter_by(user_id=user_id).first()
        user = User.query.filter_by(user_id=user_id).first()
        db.session.delete(student)
        db.session.commit()
        db.session.delete(user)
        db.session.commit()

    @staticmethod
    def get_students(data):

        query = Student.query
        if 'grade_level' in data and data['grade_level'] is not None:
            query = query.filter(Student.grade_level == data['grade_level'])

        pagination = query.paginate(page=data['page'], per_page=data['per_page'], error_out=False)
        return pagination.items
