import image from '../../img/profile.png'

const Comment = () => {
    return (
        <div className="comment">
            <div className="profile-comment">
                <img src={image} alt="" className='profile-comment-image' />
                <h3 className="comment-name">Denis Catalin</h3>
                <h4 className="comment-date">19th Jul 2019</h4>
            </div>
            <div className="comment-content">
                <div className="comment10">
                    <h2 className="comment-title">Apple & Blackberry Crumble is fucking awesome</h2>
                    <div className="stars">
                            <i className="fas fa-star rating"></i><i className="fas fa-star rating"></i><i className="fas fa-star rating"></i><i className="fas fa-star rating"></i><i className="fas fa-star rating"></i>
                    </div>
                </div>
                <div className="comment80">
                    <h2 className="comment-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi labore recusandae unde numquam soluta quisquam quibusdam dignissimos blanditiis asperiores esse, accusantium similique at ipsam aut delectus explicabo et minima quia error vel, consectetur minus consequuntur officiis? Facere laudantium itaque nostrum aliquid mollitia aut quidem distinctio fugit odio in enim, dolor, fuga voluptates a minima commodi? Dolor voluptatum veritatis accusamus accusantium? Inventore ullam sed temporibus ut. Accusamus doloribus quos temporibus? Ab?</h2>
                </div>
                <div className="comment10">
                    <div className="tools-field-comments">
                        <div className="comment-likes">
                            <i className="far fa-thumbs-up"></i>
                            <h3>24</h3>
                        </div>
                        <div className="add-reply">
                        <i className="fas fa-comment-medical"></i>
                            <h3>Add a reply</h3>
                        </div>
                        <div className="see-reply">
                            <i className="fas fa-comments"></i>
                            <h3>See replies</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment
