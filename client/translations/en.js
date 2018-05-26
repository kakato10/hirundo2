const common = {
  login: 'Login',
  statistics: 'Statistics',
  register: 'Register',
  email: 'Email',
  password: 'Password',
  posts: 'Posts',
  feed: 'Feed',
  hashtagFeed: 'Hashtag Feed',
  myPosts: 'My Posts',
  settings: 'Settings',
  comments: 'Comments',
  username: 'Username'
};

const post = {
  likes: 'likes',
  comments: common.comments,
  comment: {
    label: common.comments,
    comment: 'Коментар',
    action: 'Comment',
    commentHeading: 'Add a comment?',
    placeholder: 'What do you think?'
  },
  like: 'Like',
  dislike: 'Dislike'
};

const navigation = {
  label: 'Menu',
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
    postTypes: 'Posts types',
    hashtagUsage: 'Hashtag Usage',
    withHashtags: 'With Hashtags',
    withoutHashtags: 'Without Hashtags',
    navigation
  },
  register: {
    label: common.register,
    action: common.register,
    email: common.email,
    username: common.username,
    password: common.password,
    passwordRepeat: 'Password repeat',
    passwordsNotMatching: 'Passwords do not match!',
    navigation
  },
  feed: {
    slug: 'What\'s on your mind?',
    typeHere: 'Type Here',
    usersListButton: 'Show Users List',
    action: 'Post',
    usersList: {
      label: 'Users List',
      follow: 'Follow',
      unfollow: 'Unfollow'
    },
    post,
    navigation
  },
  settings: {
    label: common.settings,
    theme: 'Theme',
    themes: {
      light: 'Light',
      dark: 'Dark',
      green: 'Green'
    },
    language: 'Language',
    languages: {
      bg: 'Bulgarian',
      en: 'English'
    },
    navigation
  },
  hashtagFeed: {
    label: 'Search for a hashtag',
    placeholder: 'Enter hashtag',
    action: 'Search',
    post,
    navigation
  },
  myPosts: {
    label: 'My Posts',
    post,
    navigation
  }
};

export default translations;
