from app import db

class Teacher(db.Model):
    teacher_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(255), nullable=False)
    subject_expertise = db.Column(db.String(255), nullable=False)

    user = db.relationship('User', foreign_keys=[user_id], backref=db.backref('teacher', cascade='all, delete-orphan'))

    def serialize(self):
        return {
            'teacher_id': self.teacher_id,
            'user_id': self.user_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone_number': self.phone_number,
            'subject_expertise': self.subject_expertise,
            'user': self.user.serialize() if self.user else None
        }

    def __repr__(self):
        return f"<Teacher(teacher_id={self.teacher_id}, first_name='{self.first_name}', last_name='{self.last_name}', subject_expertise='{self.subject_expertise}')>"
