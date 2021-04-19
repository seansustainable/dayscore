module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', { // MySQL에서는 users 테이블 생성
        // id를 기본적으로 넣어준다.
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        // 한글 저장(기존 MySQL에서는 한글을 넣으면 한글이 깨짐) + mb4(이모티콘)
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    })
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag'});
    };
    return Hashtag;
}
