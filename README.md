# Документация

Дааное приложение было сгенерировано при помощи библиотеки [CoreUI for React](https://gitlab.com/zeus.kg/finappclient/admindashboard/-/blob/main/src/redux/API.js);

Чтобы запустить приложение у себя локально, выполните следующие команды;
`$ npm install`
`$ npm start`

## API

Файл с API [здесь](https://gitlab.com/zeus.kg/finappclient/partneradmindashboard/-/blob/main/src/redux/API.js);

Конфигурация AXIOS [здесь](https://gitlab.com/zeus.kg/finappclient/partneradmindashboard/-/blob/main/src/redux/api/axiosConfig.js);

## Бизнес логика

При написании бизнес логики была использована библиотека[react-redux](https://react-redux.js.org/), все файлы лежат [здесь](https://gitlab.com/zeus.kg/finappclient/partneradmindashboard/-/tree/main/src/redux);

## Основные моменты

##### Авторизация и аунтификация

Для безопасности приложения была задействована платформа [OIDC](https://openid.net/connect/);

Данные о пользователе хранятся в sessionStorage;

Конфигурация OIDC находится в директории [App.js](https://gitlab.com/zeus.kg/finappclient/partneradmindashboard/-/blob/main/src/App.js);

```
  const oidcConfig = {
    onSignIn: async (user) => {
      dispatch({ type: "LOGIN_TRUE" })
      localStorage.setItem("user", JSON.stringify(user));
    },
    autoSignIn: true,
    authority: 'https://cash2u.io:7001',
    clientId: 'partner_admin_app',
    redirectUri: 'https://reverent-hopper-b3ba6d.netlify.app/cb',
    scope: "openid profile offline_access"
  };


```
