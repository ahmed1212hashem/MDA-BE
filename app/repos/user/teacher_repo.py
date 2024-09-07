from app.db import db
from app.models.users.teachers import Teacher
from app.models.users.users import User


class TeacherRepository:
    @staticmethod
    def create_teacher(teacher):
        created_teacher = Teacher(**teacher)
        db.session.add(created_teacher)
        db.session.commit()
        return created_teacher

    @staticmethod
    def get_teacher_by_id(user_id):
        return Teacher.query.filter_by(user_id=user_id).first()

    @staticmethod
    def update_teacher(teacher, data):
        for key, value in data.items():
            setattr(teacher, key, value)
        db.session.commit()
        return teacher

    @staticmethod
    def delete_teacher_by_id(user_id):
        teacher = Teacher.query.filter_by(user_id=user_id).first()
        user = User.query.filter_by(user_id=user_id).first()
        db.session.delete(teacher)
        db.session.commit()
        db.session.delete(user)
        db.session.commit()

    @staticmethod
    def get_teachers(data):

        query = Teacher.query
        if 'subject_expertise' in data and data['subject_expertise'] is not None:
            query = query.filter(Teacher.grade_level == data['subject_expertise'])

        pagination = query.paginate(page=data['page'], per_page=data['per_page'], error_out=False)
        return pagination.items
