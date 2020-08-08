server_nodeJS

Сервер с использованием nodeJS и БД(MongoDB);

Функционал:
1. Регистрация и авторизация
2. Просмотр профиля
3. Изменение профиля, а также логина и пароля

Настройка БД

Необходимо настроить MongoDB и соответсвующий путь к ней.
Я использовал облачную БД(настройка и получение соответсвующей ссылки по видео: https://www.youtube.com/watch?v=jzZwarOxNCA)

ссылку необходимо вставить в строчку в файле server/config.js
                                            MONGO_URL: 'sampleURL',
                                            и вместо sampleURL вписать её
                                       
Настройка расширений nodeJS
  В папке проекта в терминале ввести команды:
                    (может потребоваться установка yarn)
                    1. git init
                    2. yarn init -y
                    3. yarn add -D eslint eslint-plugin-node
                    4. yarn add express
                    5. yarn add body-parser
                    6. yarn add bcrypt-nodejs
                    7. yarn add express-session
                    8. yarn add connect-mongo
                    9. yarn add mongoose
                    
Запуск производить в терминале командой: yarn dev
