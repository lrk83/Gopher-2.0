const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Event model
class Event extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            event_id: body.event_id
        }).then(() => {
            return Event.findOne({
                where: {
                    id: body.event_id
                },
                attributes: [
                    'id',
                    'event_url',
                    'title',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE event.id = vote.event_id)'),
                        'vote_count'
                    ]
                ]
            });
        });
    }
}

// create fields/columns for Event model
Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        event_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'event'
    }
);

module.exports = Event;