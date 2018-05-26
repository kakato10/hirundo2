const common = {
  login: 'Вписване',
  statistics: 'Статистики',
  register: 'Регистрация',
  email: 'Имейл',
  password: 'Парола',
  posts: 'Съобщения',
  feed: 'Поредица',
  hashtagFeed: 'Хаштаг Поредица',
  myPosts: 'Моите съобщения',
  settings: 'Настройки',
  comments: 'Коментари',
  username: 'Потребителски име'
};

const post = {
  likes: 'харесвания',
  comments: common.comments,
  comment: {
    label: common.comments,
    comment: 'Коментар',
    action: 'Коментирай',
    commentHeading: 'Добави коментар',
    placeholder: 'Какво мислиш?'
  },
  like: 'Харесай',
  dislike: 'Отхаресай'
};

const navigation = {
  label: 'Меню',
  login: common.login,
  register: common.register,
  statistics: common.statistics,
  settings: common.settings,
  myPosts: common.myPosts,
  feed: common.feed,
  hashtagFeed: common.hashtagFeed
};

const translations = {
  login: {
    label: common.login,
    action: common.login,
    username: common.username,
    password: common.password,
    navigation
  },

  statistics: {
    label: common.statistics,
    postTypes: 'Типове съобщения',
    hashtagUsage: 'Използвани хаштагове',
    withHashtags: 'С хаштагове',
    withoutHashtags: 'Без хаштагове',
    navigation
  },
  register: {
    label: common.register,
    action: common.register,
    email: common.email,
    username: common.username,
    password: common.password,
    passwordRepeat: 'Повтори парола',
    passwordsNotMatching: 'Паролите не съвпадат!',
    navigation
  },
  feed: {
    slug: 'Какво мислиш?',
    typeHere: 'Попълни',
    usersListButton: 'Списък с потребители',
    action: 'Публикувай',
    usersList: {
      label: 'Списък с потребители',
      follow: 'Последвай',
      unfollow: 'Спри следването'
    },
    post,
    navigation
  },
  settings: {
    label: common.settings,
    theme: 'Тема',
    themes: {
      light: 'Светла',
      dark: 'Тъмна',
      green: 'Зелена'
    },
    language: 'Език',
    languages: {
      bg: 'Български',
      en: 'Английски'
    },
    navigation
  },
  hashtagFeed: {
    label: 'Търси хаштаг',
    placeholder: 'Въведи хаштаг',
    action: 'Търси',
    post,
    navigation
  },
  myPosts: {
    label: 'Моите постове',
    post,
    navigation
  }
};

export default translations;
