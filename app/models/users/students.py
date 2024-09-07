from app import db

class Student(db.Model):
    student_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(255), nullable=False)
    grade_level = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', foreign_keys=[user_id], backref=db.backref('student', cascade='all, delete-orphan'))

    def serialize(self):
        return {
            'student_id': self.student_id,
            'user_id': self.user_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'grade_level': self.grade_level,
            'phone_number': self.phone_number,
            'user': self.user.serialize() if self.user else None
        }

    def __repr__(self):
        return f"<Student(student_id={self.student_id}, first_name='{self.first_name}', last_name='{self.last_name}', grade_level={self.grade_level})>"
