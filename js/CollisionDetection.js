class CollisionDetection {
  constructor() {
    this.entities = [];
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  checkCollisions() {
    var i, j, firstElement, secondElement;
    var entityCount = this.entities.length;
    var collisions = [];

    // Dead entities don't need to collide
    for (i = 0; i < entityCount; i++) { // Change to check if entity is dead
      firstElement = this.entities[i];

      for (j = i + 1; j < entityCount; j++) {
        secondElement = this.entities[j];

        if (this.entitiesCollided(firstElement, secondElement)) {
          collisions.push([firstElement, secondElement]);
        }
      }
    }
    return collisions;
  }

  entitiesCollided(firstElement, secondElement) {
    var boxOne = firstElement.getCollisionBox();
    var boxTwo = secondElement.getCollisionBox();
    if (boxOne.minX < boxTwo.maxX &&
      boxTwo.minX < boxOne.maxX &&
      boxOne.minY < boxTwo.maxY &&
      boxTwo.minY < boxOne.maxY) {
      return true;
    } else {
      return false;
    }
  }

  processCollisions(collisions) {
    collisions.forEach(function(element) {
      element[0].skipUpdate = true;
      element[1].skipUpdate = true;
    });
  }


}