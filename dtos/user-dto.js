class UserDto {
  id;
  name;
  username;
  avatar;
  phone;
  activated;
  updatedAt;

  constructor(user) {
    this.id = user._id;
    this.phone = user.phone;
    this.name = user.name;
    this.username = user.username;
    this.avatar = user.avatar;
    this.activated = user.activated;
    this.updatedAt = user.updatedAt;
  }
}

module.exports = UserDto;
