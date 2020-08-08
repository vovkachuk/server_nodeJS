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
                    git init
                    yarn init -y
                    yarn add -D eslint eslint-plugin-node
                    yarn add express
                    yarn add body-parser
                    yarn add bcrypt-nodejs
                    yarn add express-session
                    yarn add connect-mongo
                    yarn add mongoose
                    
Запуск производить в терминале командой: yarn dev
