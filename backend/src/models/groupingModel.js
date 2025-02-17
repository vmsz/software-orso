import database from "../config/database.js"
import { DataTypes } from "sequelize"

const groupingModel = database.define('groupings', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    code: {
        allowNull: false,
        type: DataTypes.JSONB
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING
    },
})

export default groupingModel