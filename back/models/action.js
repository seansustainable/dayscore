module.exports = (sequelize, DataTypes) => {
    const Action = sequelize.define('Action', { // MySQL에서는 actions 테이블 생성
        // id를 기본적으로 넣어준다.
        title: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        // 한글 저장(기존 MySQL에서는 한글을 넣으면 한글이 깨짐) + mb4(이모티콘)
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    })
    Action.associate = (db) => {
        db.Action.belongsTo(db.User);
    };
    return Action;
}
