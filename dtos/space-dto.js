class SpaceDto {
  id;
  topic;
  spaceType;
  hostId;
  speakers;
  createdAt;

  constructor(space) {
    this.id = space._id;
    this.topic = space.topic;
    this.spaceType = space.spaceType;
    this.hostId = space.hostId;
    this.speakers = space.speakers;
    this.createdAt = space.createdAt;
  }
}

module.exports = SpaceDto;
