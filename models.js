import { DataTypes, Model, Sequelize } from "sequelize";

const sqlDBEngine = new Sequelize("todo_test", "root", "", {
    host: "127.0.0.1",
    dialect: "mysql",
    logging: console.log,
    define: {
        timestamps: false
    }
 });

class ActivityGroup extends Model {}
class TodoItems extends Model {}

class ResponseFormat {
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

ActivityGroup.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, 
{
    sequelize: sqlDBEngine,
    modelName: "activity_group"
});

TodoItems.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: DataTypes.ENUM("very-low", "low", "medium", "high", "very-high"),
        allowNull: true,
        defaultValue: "very-high"
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    activity_group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date()
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
},
{
   sequelize: sqlDBEngine,
   modelName: "todo_items"
});

export {
    ActivityGroup,
    TodoItems,
    ResponseFormat
};