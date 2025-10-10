import { EntitySchema } from "typeorm";

const user = new EntitySchema({
    name: "User",
    tablename: "User",
    columns: {
        id: {primary:true, type: "int", generated: "increment"},
        name: {type: "varchar", length: 50, nullable:false},
        password: {type: "varchar", length:50, nullable:false},
        email: {type: "varchar", length:50, nullable:false},
        typeUser: {type:"enum", enum: ["admin", "comum"], nullable:false},
        createdAt: {type:"datetime", nullable:true, default: () => {
            "CURRENT_TIMESTAMP"
        }},
        deletedAt: {type:"datetime", nullable:true},
    },
})

export default user