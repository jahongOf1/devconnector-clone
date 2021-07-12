import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import  { getProfiles } from '../../actions/profile';
import profile from '../../reducers/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading }}) => {
    useEffect(() => {
        getProfiles();
    }, []);

    return <div> hangtan </div>;
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getProfiles })(Profiles);
