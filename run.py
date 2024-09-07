from app import create_app

if __name__ == '__main__':
    app, db_instance = create_app(config_name="development")
    with app.app_context():
        db_instance.create_all()
    app.run(debug=True)
