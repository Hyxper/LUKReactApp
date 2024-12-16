import { Fragment } from 'react';
import { Container, Menu } from 'semantic-ui-react';

export default function NavBar() {
    return (
        <Fragment>
            <Menu inverted fixed="top">
                <Container className="menu-container">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/assets/logo.png" alt="logo" style={{ width: '150px', height: '20px', marginRight: '10px' }} />
                    </div>
                </Container>
            </Menu>
        </Fragment>
    )
}