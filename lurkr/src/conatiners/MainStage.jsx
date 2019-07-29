import React from 'react';
import Subreddit from '../components/Subreddit'
import BasicGrid from './BasicGrid'
import { Container } from '@material-ui/core';


//TO-DO: Consider making this a Material UI container


export default function MainStage() {


  let subreddits = [{name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]},{name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}, {name: "Cats", posts: ["hfjsda", "fdsjha", "fa"]}]

  return (

    <BasicGrid subreddits={subreddits}/>

  )
}