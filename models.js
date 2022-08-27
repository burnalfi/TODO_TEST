import { DataTypes, Model, Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sqlDBEngine = new Sequelize(String(process.env["MYSQL_DBNAME"]), String(process.env["MYSQL_USER"]), String(process.env["MYSQL_PASSWORD"]), {
    host: String(process.env["MYSQL_HOST"]),
    port: parseInt(process.env["MYSQL_PORT"]),
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
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
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
    modelName: "activities"
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
        allowNull: true
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
        allowNull: true,
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
   modelName: "todos"
});

export {
    ActivityGroup,
    TodoItems,
    ResponseFormat,
    sqlDBEngine
};