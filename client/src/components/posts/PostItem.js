import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';

const PostItem = ({ 
    auth, 
    deletePost,
    post: { _id, text, name, avatar, user, date },
    showActions
}) => ( <div className="post bg-white p-1 my-1">
            <div>
                <a href="profile.html">
                    <img
                    className="round-img"
                    src={avatar}
                    alt=""
                    />
                    <h4>{name}</h4>
                </a>
            </div>
            <div>
                <p className="my-1">
                   {text}
                </p>
                <p className="post-date">
                    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>

                {showActions && <Fragment>
                    <Link to={`/posts/${_id}`} className ='btn btn-primary'>
                        <span> Continue Reading </span>

                    </Link>
                    {!auth.loading && user === auth.user._id && (
                        <button onClick={e => deletePost(_id)} type='button' className='btn btn-danger'>   
                        <i className="fas fa-times"></i>
                        </button>
                    )}
                </Fragment>}
               
               
            </div>
        </div> );

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { deletePost })(PostItem)
