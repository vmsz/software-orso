import database from "../config/database.js"
import { DataTypes } from "sequelize"


const compositionModel = database.define('compositions', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    wbs: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    code: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    unity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    measurementCriteria: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    inputs: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false
    }
})

export default compositionModel