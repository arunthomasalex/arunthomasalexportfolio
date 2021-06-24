import React from 'react';

export const PortfolioContext = React.createContext({ portfolio: void 0 });

export const withPortfolioContext = (Component) => {
    return (props) => {
        return (
            <PortfolioContext.Consumer>
                {(context) => <Component {...props} {...context}/>}
            </PortfolioContext.Consumer>
        );
    }
}