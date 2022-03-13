import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PageLoader from '@/components/PageLoader';

const Review = ({ match }) => {
  const requestedUrl = match.url.replace(/\/$/, '');
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Redirect exact from={`${requestedUrl}/`} to={`${requestedUrl}/`} />

        <Route path={`${requestedUrl}/detail/:bookid/:reviewid`} component={lazy(() => import(`./ReviewDetail`))} />
       

        <Route component={lazy(() => import('../Errors/404'))} />
      </Switch>
    </Suspense>
  );
};

export default Review;
