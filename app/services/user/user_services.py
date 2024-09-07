from datetime import timedelta

from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

from app.enums.user.user_roles import UserRole
from app.repos.user.user_repo import UserRepository
from app.repos.user.student_repo import StudentRepository
from app.repos.user.teacher_repo import TeacherRepository


class UserService:
    @staticmethod
    def create_admin_user(user):
        user['role'] = UserRole.ADMIN
        email_user = UserRepository.get_user_by_email(user['email'])
        if email_user:
            pass

        username_user = UserRepository.get_user_by_username(user['username'])
        if username_user:
            pass

        user['password'] = generate_password_hash(user['password'], method='sha256')
        return UserRepository.create_user(user)

    @staticmethod
    def create_student_user(user):
        student = {
            'first_name': user.get('first_name'),
            'last_name': user.get('last_name'),
            'phone_number': user.get('phone_number'),
            'grade_level': user.get('grade_level')
        }
        del user['first_name']
        del user['last_name']
        del user['phone_number']
        del user['grade_level']

        user['role'] = UserRole.STUDENT
        email_user = UserRepository.get_user_by_email(user['email'])
        if email_user:
            pass

        username_user = UserRepository.get_user_by_username(user['username'])
        if username_user:
            pass

        user['password'] = generate_password_hash(user['password'], method='sha256')
        created_user = UserRepository.create_user(user)
        student['user_id'] = created_user.user_id
        return StudentRepository.create_student(student)

    @staticmethod
    def create_teacher_user(user):
        teacher = {
            'first_name': user.get('first_name'),
            'last_name': user.get('last_name'),
            'phone_number': user.get('phone_number'),
            'subject_expertise': user.get('subject_expertise')
        }
        del user['first_name']
        del user['last_name']
        del user['phone_number']
        del user['subject_expertise']

        user['role'] = UserRole.TEACHER
        email_user = UserRepository.get_user_by_email(user['email'])
        if email_user:
            pass

        username_user = UserRepository.get_user_by_username(user['username'])
        if username_user:
            pass

        user['password'] = generate_password_hash(user['password'], method='sha256')
        created_user = UserRepository.create_user(user)
        teacher['user_id'] = created_user.user_id
        return TeacherRepository.create_teacher(teacher)

    @staticmethod
    def authenticate(data):

        repo_user = UserRepository.get_user_by_email(data['email'])
        if not repo_user:
            pass

        if not check_password_hash(repo_user.password, data['password']):
            pass

        expires_delta = timedelta(hours=12)
        access_token = create_access_token(identity={"user_id": repo_user.user_id, "role": str(repo_user.role)},
                                           expires_delta=expires_delta)
        return access_token

    @staticmethod
    def get_user(user_id):
        user = UserRepository.get_user_by_id(user_id)
        if not user:
            raise Exception('User not found')
        return user

    @staticmethod
    def get_all_students(data):
        return StudentRepository.get_students(data)

    @staticmethod
    def get_student_by_id(user_id):
        student = StudentRepository.get_student_by_id(user_id)
        if not student:
            raise Exception("Student not found")
        return student

    @staticmethod
    def get_all_teachers(data):
        return TeacherRepository.get_teachers(data)

    @staticmethod
    def get_teacher_by_id(user_id):
        teacher = TeacherRepository.get_teacher_by_id(user_id)
        if not teacher:
            raise Exception("Teacher nt not found")
        return teacher

    @staticmethod
    def update_user(user_id, data):
        user = UserRepository.get_user_by_id(user_id)
        return UserRepository.update_user(user, data)

    @staticmethod
    def delete_user(user_id, role):
        user = UserRepository.get_user_by_id(user_id)
        if not user:
            raise Exception("User not found")

        if role == UserRole.TEACHER.value:
            teacher = TeacherRepository.get_teacher_by_id(user_id)
            if not teacher:
                raise Exception("Teacher not found")
            TeacherRepository.delete_teacher_by_id(user_id)
        elif role == UserRole.STUDENT.value:
            student = StudentRepository.get_student_by_id(user_id)
            if not student:
                raise Exception("Student not found")
            StudentRepository.delete_student_by_id(user_id)
