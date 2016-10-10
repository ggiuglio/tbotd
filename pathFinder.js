
function pathFinder(startX, startY, goalX, goalY) {
    var start = { x: startX, y: startY };
    var goal = { x: goalX, y: goalY };

    var charTarget = pointInPlayer(goalX, goalY, players);
    var objTarget = pointInObject(goalX, goalY, objects, true);

    if (canGo(start, goal, activeCharacter, objTarget, charTarget)) {
        var path = {
            wayPoints: [[goal.x, goal.y]],
            distance: getDist(start, goal)
        };
        return path;
    } else {
        var paths = findPath(start, goal, objTarget, charTarget);

        var bestPath = getBestPath(paths);
       
        console.log("result", bestPath);
        return bestPath;
    }
};

function getBestPath(paths) {

    paths.sort(function (a, b) {
        return parseFloat(paths.distance) - parseFloat(paths.distance);
    });

    var bestPath = null;

    if (paths.length > 0) {

        bestPath = {
            distance: paths[0].distance,
            wayPoints: []
        };

        for (var i = 0; i < paths[0].path.length; i++) {
            bestPath.wayPoints.push([paths[0].path[i].x, paths[0].path[i].y]);
        }

    }

    return bestPath;
};

function findPath(start, goal, objTarget, charTarget) {
    var pathsTree = createPathTree(start, goal, objTarget, charTarget);
    var shortestPath = readPathThree(pathsTree, {goodPath: []});
    
    return shortestPath.goodPath;
};

function createPathTree(start, goal, objTarget, charTarget) {
    var maxLoops = 8;
    var tree = createNode(start, goal, null, 0, objTarget, charTarget, 0, maxLoops);
    return tree;
};

function createNode(start, goal, parentPath, parentPathLength, objTarget, charTarget, loop, maxLoops) {

    var node = {
        position: start,
        loop: loop + 1,
        nextSteps: [],
        goal: false,
        fail: false,
        path: [],
        pathLength: parentPathLength
    };
      
    if (parentPath != null) {
        for (var p = 0; p < parentPath.length; p++) {
            node.path.push(parentPath[p]);
        }

        if (node.path.length > 0) {
            node.pathLength += getDist(node.path[node.path.length - 1], start);
        }

        node.path.push(start);
    }

    if (canGo(start, goal, activeCharacter, objTarget, charTarget)) {
        node.goal = true;
        node.pathLength += getDist(node.path[node.path.length - 1], goal);
        node.path.push(goal);
        //console.log("------ loop", node.loop, "----- node path", node.path, "----------lenght: ", node.pathLength)
    } else {
        if (node.loop < maxLoops) {
            var pathPoints = findPathPoints(start, goal, objTarget, charTarget);
            for (var i = 0; i < pathPoints.length; i++) {
                node.nextSteps.push(createNode(pathPoints[i], goal, node.path, node.pathLength, node.objTarget, node.charTarget, node.loop, maxLoops));
            }
        }
    }

    return node;
};

function findPathPoints(start, goal, objTarget, charTarget) {
    var line = lineFromPoints(start.x, start.y, goal.x, goal.y);

    var checkedLines = getCheckLines(line, start, goal);

    var obstacle = getBarrier(checkedLines, objTarget, charTarget);

    var possiblePoints = getPointsOnObstacle(obstacle, line);

    var goodPoints = [];

    //point 1
    if (possiblePoints.point1 != null && possiblePoints.point1.x != null && possiblePoints.point1.y != null &&
        checkTrajector(start.x, start.y, possiblePoints.point1.x, possiblePoints.point1.y, activeCharacter.character.radius, activeCharacter.character.radius, objTarget, charTarget) == 1) {
        goodPoints.push(possiblePoints.point1);
    }

    //point 2
    if (possiblePoints.point2 != null && possiblePoints.point2.x != null && possiblePoints.point2.y != null &&
        checkTrajector(start.x, start.y, possiblePoints.point2.x, possiblePoints.point2.y, activeCharacter.character.radius, activeCharacter.character.radius, objTarget, charTarget) == 1) {
        goodPoints.push(possiblePoints.point2);
    }

    //point 3
    if (possiblePoints.point3 != null && possiblePoints.point3.x != null && possiblePoints.point3.y != null &&
        checkTrajector(start.x, start.y, possiblePoints.point3.x, possiblePoints.point3.y, activeCharacter.character.radius, activeCharacter.character.radius, objTarget, charTarget) == 1) {
        goodPoints.push(possiblePoints.point3);
    }

    //point 4
    if (possiblePoints.point4 != null && possiblePoints.point4.x != null && possiblePoints.point4.y != null &&
        checkTrajector(start.x, start.y, possiblePoints.point4.x, possiblePoints.point4.y, activeCharacter.character.radius, activeCharacter.character.radius, objTarget, charTarget) == 1) {
        goodPoints.push(possiblePoints.point4);
    }

    return goodPoints;
};

function getCheckLines(movementLine, start, goal) {
    var lines = [];

    var diameterA = calculateDiameterPoints(movementLine, goal.x, goal.y, start.x, start.y, activeCharacter.character.radius);
    var diameterB = calculateDiameterPoints(movementLine, start.x, start.y, goal.x, goal.y, activeCharacter.character.radius);

    for (var i = 0; i < diameterA.length; i++) {
        for (var j = 0; j < diameterB.length; j++) {
            var l = lineFromPoints(diameterA[i].x, diameterA[i].y, diameterB[j].x, diameterB[j].y);
            lines.push(l);
        }
    }
    return lines;
};

function getPointsOnObstacle (obstacle, line) {
    var points;
    if (obstacle.type == "wall") {
        points = getWayPointsOnWall(obstacle);
    }
    if (obstacle.type == "character") {
        points = getWayPointsOnChar(obstacle, line);
    }

    if (obstacle.type == "object") {
        points = getWayPointsOnObj(obstacle, line);
    }

    return points;
};

function readPathThree(pathTree, result) {
    if (pathTree.goal) {
        result.goodPath.push({ path: pathTree.path, distance: pathTree.pathLength });
    } else if (!pathTree.fail) {
        for (var i = 0; i < pathTree.nextSteps.length; i++) {
            readPathThree(pathTree.nextSteps[i], result);
        }
    }

    return result;
};

function canGo(start, goal, char, objTarget, charTarget) {
    return checkTrajector(start.x, start.y, goal.x, goal.y, char.character.radius, char.character.radius, objTarget, charTarget) == 1
};

function getDist(start, goal) {
    return Math.sqrt(Math.pow(start.x - goal.x, 2) + Math.pow(start.y - goal.y, 2));
};

function getWayPointsOnWall(barrier) {
    var points = {};
    var wallLength = Math.sqrt(Math.pow((barrier.wall[0] - barrier.wall[2]), 2) + Math.pow((barrier.wall[1] - barrier.wall[3]), 2));
    var wallLine = lineFromPoints(barrier.wall[0], barrier.wall[1], barrier.wall[2], barrier.wall[3]);
    var wallEnd1 = setMoveOnDistance(barrier.wall[0], barrier.wall[1], barrier.wall[2], barrier.wall[3], wallLength + activeCharacter.character.radius + 10);
    var wallEnd2 = setMoveOnDistance(barrier.wall[2], barrier.wall[3], barrier.wall[0], barrier.wall[1], wallLength + activeCharacter.character.radius + 10);

    var m = -1 / wallLine.m;
    var q = -m * wallEnd1.x + wallEnd1.y;


    points.point1 = setMoveOnDistance(wallEnd1.x, wallEnd1.y, (wallEnd1.x + 20), ((wallEnd1.x + 20) * m + q), activeCharacter.character.radius + 10);
    points.point2 = setMoveOnDistance(wallEnd1.x, wallEnd1.y, (wallEnd1.x - 20), ((wallEnd1.x - 20) * m + q), activeCharacter.character.radius + 10);
    q = -m * wallEnd2.x + wallEnd2.y;

    points.point3 = setMoveOnDistance(wallEnd2.x, wallEnd2.y, (wallEnd2.x + 20), ((wallEnd2.x + 20) * m + q), activeCharacter.character.radius + 10);
    points.point4 = setMoveOnDistance(wallEnd2.x, wallEnd2.y, (wallEnd2.x - 20), ((wallEnd2.x - 20) * m + q), activeCharacter.character.radius + 10);

    points.point1.x = Math.round(points.point1.x);
    points.point1.y = Math.round(points.point1.y);
    points.point2.x = Math.round(points.point2.x);
    points.point2.y = Math.round(points.point2.y);
    points.point3.x = Math.round(points.point3.x);
    points.point3.y = Math.round(points.point3.y);
    points.point4.x = Math.round(points.point4.x);
    points.point4.y = Math.round(points.point4.y);

    return points
};

function getWayPointsOnChar(barrier, line) {
    var points = {};
    var charLine = lineFromPoints(line.pointA.x, line.pointA.y, barrier.character.posX, barrier.character.posY)
    var dist = Math.sqrt(Math.pow((line.pointA.x - barrier.character.posX), 2) + Math.pow((line.pointA.y - barrier.character.posY), 2));

    var charEnd1 = setMoveOnDistance(line.pointA.x, line.pointA.y, barrier.character.posX, barrier.character.posY, dist - (barrier.character.character.radius));
    var charEnd2 = setMoveOnDistance(line.pointA.x, line.pointA.y, barrier.character.posX, barrier.character.posY, dist + (barrier.character.character.radius));

    var m = -1 / charLine.m;
    var q = -m * charEnd1.x + charEnd1.y;

    points.point1 = setMoveOnDistance(charEnd1.x, charEnd1.y, (charEnd1.x + (barrier.character.character.radius)), ((charEnd1.x + (barrier.character.character.radius)) * m + q), barrier.character.character.radius + activeCharacter.character.radius + (activeCharacter.character.radius / 3));
    points.point2 = setMoveOnDistance(charEnd1.x, charEnd1.y, (charEnd1.x - (barrier.character.character.radius)), ((charEnd1.x - (barrier.character.character.radius)) * m + q), barrier.character.character.radius + activeCharacter.character.radius + (activeCharacter.character.radius / 3));

    q = -m * charEnd2.x + charEnd2.y;

    points.point3 = setMoveOnDistance(charEnd2.x, charEnd2.y, (charEnd2.x + (barrier.character.character.radius)), ((charEnd2.x + (barrier.character.character.radius)) * m + q), barrier.character.character.radius + activeCharacter.character.radius + (activeCharacter.character.radius / 3));
    points.point4 = setMoveOnDistance(charEnd2.x, charEnd2.y, (charEnd2.x - (barrier.character.character.radius)), ((charEnd2.x - (barrier.character.character.radius)) * m + q), barrier.character.character.radius + activeCharacter.character.radius + (activeCharacter.character.radius / 3));

    points.point1.x = Math.round(points.point1.x);
    points.point1.y = Math.round(points.point1.y);
    points.point2.x = Math.round(points.point2.x);
    points.point2.y = Math.round(points.point2.y);
    points.point3.x = Math.round(points.point3.x);
    points.point3.y = Math.round(points.point3.y);
    points.point4.x = Math.round(points.point4.x);
    points.point4.y = Math.round(points.point4.y);

    return points;
}

function getWayPointsOnObj(barrier, line) {
    var points = {};
    var charLine = lineFromPoints(line.pointA.x, line.pointA.y, barrier.object.posX, barrier.object.posY)
    var dist = Math.sqrt(Math.pow((line.pointA.x - barrier.object.posX), 2) + Math.pow((line.pointA.y - barrier.object.posY), 2));

    var charEnd1 = setMoveOnDistance(line.pointA.x, line.pointA.y, barrier.object.posX, barrier.object.posY, dist - (barrier.object.radius - (barrier.object.radius / 3)));
    var charEnd2 = setMoveOnDistance(line.pointA.x, line.pointA.y, barrier.object.posX, barrier.object.posY, dist + (barrier.object.radius - (barrier.object.radius / 3)));

    var m = -1 / charLine.m;
    var q = -m * charEnd1.x + charEnd1.y;

    points.point1 = setMoveOnDistance(charEnd1.x, charEnd1.y, (charEnd1.x + barrier.object.radius), ((charEnd1.x + barrier.object.radius) * m + q), barrier.object.radius + activeCharacter.character.radius + (barrier.object.radius / 3));
    points.point2 = setMoveOnDistance(charEnd1.x, charEnd1.y, (charEnd1.x - barrier.object.radius), ((charEnd1.x - barrier.object.radius) * m + q), barrier.object.radius + activeCharacter.character.radius + (barrier.object.radius / 3));

    q = -m * charEnd2.x + charEnd2.y;

    points.point3 = setMoveOnDistance(charEnd2.x, charEnd2.y, (charEnd2.x + barrier.object.radius), ((charEnd2.x + barrier.object.radius) * m + q), barrier.object.radius + activeCharacter.character.radius + (barrier.object.radius / 3));
    points.point4 = setMoveOnDistance(charEnd2.x, charEnd2.y, (charEnd2.x - barrier.object.radius), ((charEnd2.x - barrier.object.radius) * m + q), barrier.object.radius + activeCharacter.character.radius + (barrier.object.radius / 3));

    points.point1.x = Math.round(points.point1.x);
    points.point1.y = Math.round(points.point1.y);
    points.point2.x = Math.round(points.point2.x);
    points.point2.y = Math.round(points.point2.y);
    points.point3.x = Math.round(points.point3.x);
    points.point3.y = Math.round(points.point3.y);
    points.point4.x = Math.round(points.point4.x);
    points.point4.y = Math.round(points.point4.y);
    return points;
};

function getBarrier(checkedLines, objTarget, charTarget) {
    var interceptions = [];
    var wallLikeBarrier = [];
    for (var i = 0; i < walls.length; i++) {
        wallLikeBarrier.push(walls[i]);
    }

    var objBorders = new Array();
    for (var i = 0; i < objects.length; i++) {
        if (objects[i].cover > 0) {
            var bdr = getObjectBorders(objects[i]);

            for (var j = 0; j < bdr.length; j++)
                objBorders.push(bdr[j]);
        }
    }
    wallLikeBarrier = wallLikeBarrier.concat(objBorders);

    for (var ii = 0; ii < checkedLines.length; ii++) {
        interceptions = interceptions.concat(firstLineWallIntersecate(checkedLines[ii], wallLikeBarrier));
        interceptions = interceptions.concat(firstLineCharIntersecate(checkedLines[ii], players, charTarget));
        interceptions = interceptions.concat(firstLineObjIntersecate(checkedLines[ii], objects, objTarget));
    }
    interceptions.sort(compareInterceptionPoints);
    return interceptions[0];
};

function firstLineWallIntersecate(line, walls) {
    var interceptionPoints = new Array();
    for (var i = 0; i < walls.length; i++) {
        var wallLine = lineFromPoints(walls[i][0], walls[i][1], walls[i][2], walls[i][3]);

        if (line.m != wallLine.m) {
            if (walls[i][0] == walls[i][2]) {
                var intY = walls[i][0] * line.m + line.q;
                if (((line.pointA.x <= walls[i][0] && walls[i][0] <= line.pointB.x) || (line.pointB.x <= walls[i][0] && walls[i][0] <= line.pointA.x))
					&& ((walls[i][1] <= intY && intY <= walls[i][3]) || (walls[i][3] <= intY && intY <= walls[i][1]))
					) {
                    var interception = new Object();
                    interception.type = "wall";
                    interception.wall = walls[i];
                    interception.x = walls[i][0];
                    interception.y = intY;
                    interception.dist = Math.sqrt(Math.pow((line.pointA.x - interception.x), 2) + Math.pow((line.pointA.y - interception.y), 2))

                    interceptionPoints.push(interception);
                }
            }
            else {
                var A1 = line.pointB.y - line.pointA.y;
                var B1 = line.pointB.x - line.pointA.x;
                var C1 = A1 * line.pointA.x + B1 * line.pointA.y;

                var A2 = walls[i][3] - walls[i][1];
                var B2 = walls[i][2] - walls[i][0];
                var C2 = A2 * walls[i][0] + B2 * walls[i][1];

                var det = A1 * B2 - A2 * B1;

                var interceptionX = (line.q - wallLine.q) / (wallLine.m - line.m);
                var interceptionY = interceptionX * line.m + line.q;

                if (((walls[i][0] < interceptionX && interceptionX < walls[i][2]) || (walls[i][2] < interceptionX && interceptionX < walls[i][0]))
					&& ((line.pointB.x >= interceptionX && interceptionX >= line.pointA.x) || (line.pointB.x <= interceptionX && interceptionX <= line.pointA.x))
					) {
                    var interception = new Object();
                    interception.type = "wall";
                    interception.wall = walls[i];
                    interception.x = interceptionX;
                    interception.y = interceptionY;
                    interception.dist = Math.sqrt(Math.pow((line.pointA.x - interception.x), 2) + Math.pow((line.pointA.y - interception.y), 2));

                    interceptionPoints.push(interception);
                }
            }
        }
    }

    return interceptionPoints;
};

function firstLineCharIntersecate(line, players, charTarget) {
    var interceptionPoints = new Array();
    for (var i = 0; i < players.length; i++) {
        if (players[i].character.alive && (charTarget == null || players[i] != charTarget)) {
            if (Math.sqrt(Math.pow((line.pointB.x - players[i].posX), 2) + Math.pow((line.pointB.y - players[i].posY), 2)) < (players[i].character.radius + activeCharacter.character.radius)) {
                var interception = new Object();
                interception.type = "character";
                interception.character = players[i];
                interception.x = line.pointB.x;
                interception.y = line.pointB.y;
                interception.dist = Math.sqrt(Math.pow((line.pointA.x - players[i].posX), 2) + Math.pow((line.pointA.y - players[i].posY), 2));

                interceptionPoints.push(interception);
            }
            else {
                var x = players[i].posX;
                var y = players[i].posY;
                var perpendicularDistance = new Object();
                perpendicularDistance.m = -(1 / line.m);
                perpendicularDistance.q = y - (perpendicularDistance.m * x);
                var interceptionX = (perpendicularDistance.q - line.q) / (line.m - perpendicularDistance.m);
                var interceptionY = interceptionX * perpendicularDistance.m + perpendicularDistance.q;

                var isInterceprionInLine = (((line.pointA.x < interceptionX && interceptionX < line.pointB.x) || (line.pointB.x < interceptionX && interceptionX < line.pointA.x)) &&
						((line.pointA.y < interceptionY && interceptionY < line.pointB.y) || (line.pointB.y < interceptionY && interceptionY < line.pointA.y)));

                var distanceFromChar = Math.sqrt((interceptionX - x) * (interceptionX - x) + (interceptionY - y) * (interceptionY - y));

                // il diametro del personaggio che ostrisce la traiettoria è stato artificialmente dimezzato pre rendere più libero il movimento
                if (distanceFromChar < players[i].character.radius / 2 && isInterceprionInLine) {
                    var interception = new Object();
                    interception.type = "character";
                    interception.character = players[i];
                    interception.x = interceptionX;
                    interception.y = interceptionY;
                    interception.dist = Math.sqrt(Math.pow((line.pointA.x - interception.x), 2) + Math.pow((line.pointA.y - interception.y), 2));

                    interceptionPoints.push(interception);
                }
            }
        }
    }

    return interceptionPoints;
}

function firstLineObjIntersecate(line, objects, objTarget) {
    var interceptionPoints = new Array();
    for (var i = 0; i < objects.length; i++) {
        //if(objects[i].shape == "rectangular")
        //{
        //	var borders = getObjectBorders(objects[i]);
        //	var intersection = lineIntersecatesWalls(line, borders);


        //	interceptionPoints = interceptionPoints.concat(firstLineWallIntersecate(line, borders));

        //		console.log(intersection);
        //}

        if (objects[i].shape == "circular" && (objTarget != objects[i])) {
            if (lineIntersecatesRoundObject(line, objects[i]) > 0) {
                var interception = new Object();
                interception.type = "object";
                interception.object = objects[i];
                interception.x = objects[i].posX;
                interception.y = objects[i].posY;
                interception.dist = Math.sqrt(Math.pow((line.pointA.x - objects[i].posX), 2) + Math.pow((line.pointA.y - objects[i].posY), 2));

                interceptionPoints.push(interception);
            }

        }
    }

    return interceptionPoints;
};

function roadOrder(roadA, roadB) {
    if (roadA.length < roadB.length)
        return -1;
    else
        return 1;
}

function compareInterceptionPoints(a, b) {
    if (a.dist < b.dist)
        return -1;
    if (a.dist > b.dist)
        return 1;
    return 0;
}