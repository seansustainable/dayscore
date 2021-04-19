module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // MySQL에서는 users 테이블 생성
        // id를 기본적으로 넣어준다.
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true, // 고유한 값
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    }, {
        // 한글 저장(기존 MySQL에서는 한글을 넣으면 한글이 깨짐)
        charset: 'utf8',
        collate: 'utf8_general_ci',
    })
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.hasMany(db.Action);
        db.User.belongsToMany(db.Post, {
            through: 'Like', // through로 중간 테이블명을 설정해줄 수 있다.
            as: 'Liked', // 별칭
        })
        db.User.belongsToMany(db.User, {
            through: 'Follow',
            as: 'Followers',
            foreignKey: 'FollowingId' // 중간 테이블 컬럼명, followingId로부터 Followers를 검색
        })
        db.User.belongsToMany(db.User, {
            through: 'Follow',
            as: 'Followings',
            foreignKey: 'FollowerId' // 중간 테이블 컬럼명, followerId로부터 Followings를 검색
        })
    };
    return User;
}
