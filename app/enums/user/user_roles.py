from enum import Enum


class UserRole(Enum):
    STUDENT = 'STUDENT'
    ADMIN = 'ADMIN'
    PREADMIN = 'PREADMIN'
    TEACHER = 'TEACHER'

    def __str__(self):
        return self.value
