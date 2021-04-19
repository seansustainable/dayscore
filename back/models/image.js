module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', { // MySQL에서는 users 테이블 생성
        // id를 기본적으로 넣어준다.
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        // 한글 저장(기존 MySQL에서는 한글을 넣으면 한글이 깨짐)
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post); // belongsTo가 PostId 컬럼을 생성해준다.
    };
    return Image;
}
