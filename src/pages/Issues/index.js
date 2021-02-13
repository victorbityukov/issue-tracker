import React, {useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';
import Pagination from "@material-ui/lab/Pagination";
import {makeStyles} from "@material-ui/core";
import {useMediaQuery} from 'react-responsive'
import GitHubIcon from '@material-ui/icons/GitHub';
import {Header, IssueItem} from "../../components";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import {useDispatch, useSelector} from "react-redux";
import issueActions, {fetchCountItems} from "../../redux/actions/issues";

import "./Issues.sass"


const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
    '& > *': {
      display: 'inline-block',
      marginTop: theme.spacing(2),
    },
  },
  root: {
    display: 'grid',
    gridTemplateColumns: '5fr 1fr 5fr 1fr',
    padding: '2px 4px',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


const Index = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {isLoading, items} = useSelector(({issues}) => (issues));
  const [organization, setOrganization] = useState('facebook');
  const [repository, setRepository] = useState('react');

  const isSmall = useMediaQuery({query: '(max-width: 399px)'})
  const isMedium = useMediaQuery({query: '(min-width: 400px) and (max-width: 599px)'})
  const isLarge = useMediaQuery({query: '(min-width: 600px)'})

  const onHandlerChangeOrganization = (e) => {
    setOrganization(e.target.value)
  };

  const onHandlerChangeRepository = (e) => {
    setRepository(e.target.value)
  };

  const searchIssues = () => {
    dispatch(issueActions.fetchDataIssues(organization, repository))
  };

  return (
    <>
      <Header>
        <IconButton component="span" style={{color: '#ffffff'}}>
          <GitHubIcon/>
        </IconButton>
        Issue Trackers
      </Header>
      <Paper className="issues-container">
        <div className="search-container" noValidate autoComplete="off">
          <Paper component="form" className={classes.root}>
            <InputBase
              label="Organization" value={organization}
              onChange={onHandlerChangeOrganization}
              placeholder="Organization"
              inputProps={{'aria-label': 'organization'}}
            />
            <span className={classes.divider}>/</span>
            <InputBase
              value={repository}
              onChange={onHandlerChangeRepository}
              placeholder="Repository"
              inputProps={{'aria-label': 'repository'}}
            />
            <Button
              onClick={searchIssues}
              startIcon={<SearchIcon>search</SearchIcon>}
            />
          </Paper>
        </div>
        <div className={"items"}>
          {!isLoading ? items ? items.map((item) => (
              <IssueItem {...item} key={item.id}/>
            )) : <h4 style={{textAlign: "center"}}>Input data for search...</h4>
            :
            'Загрузка...'
          }
        </div>
        <div style={{textAlign: 'center'}}>
          {!isLoading && items &&
          <div className={classes.pagination}>
            {isSmall && <Pagination count={3} shape={"rounded"}/>}
            {isMedium && <Pagination count={5} shape={"rounded"}/>}
            {isLarge && <Pagination count={10} shape={"rounded"}/>}
          </div>}
        </div>
      </Paper>
    </>
  );
};

export default Index;