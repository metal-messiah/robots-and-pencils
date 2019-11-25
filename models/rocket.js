module.exports = class Rocket {
  constructor(obj) {
    this.badge = obj.links.mission_patch_small;
    this.name = obj.rocket.rocket_name;
    this.type = obj.rocket.rocket_type;
    this.launchDate = obj.launch_date_utc;
    this.details = obj.details;
    this.id = obj.flight_number;
    this.article = obj.links.article_link;
  }
};
