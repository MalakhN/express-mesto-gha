const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка по-умолчанию' });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: 'Пользователь не найден',
        });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id пользователя' });
        return;
      }
      res.status(500).send({ message: 'Ошибка по-умолчанию' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
      res.status(201).send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Некорректные данные для созданиия пользователя',
        });
        return;
      }
      res.status(500).send({ message: 'Ошибка по-умолчанию' });
    });
};

const updateProfile = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    owner,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: 'Пользователь с данным id не найден',
        });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Некорректные данные для обновлении профиля пользователя',
        });
        return;
      }
      res.status(500).send({ message: 'Ошибка по-умолчанию' });
    });
};

const updateAvatar = (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    owner,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({
          message: 'Пользователь с данным id не найден',
        });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Некорректные данные для обновления аватара',
        });
        return;
      }
      res.status(500).send({ message: 'Ошибка по-умолчанию' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
