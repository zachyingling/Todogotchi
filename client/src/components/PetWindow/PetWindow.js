import React, { Component } from "react";
// import "../PetWindow/Petwindow.css";
import "../Sprite/Sprite";
import { Col, Row, Container } from "../Grid";
import Jumbotron from "../Jumbotron";
import happy from "../../images/sprites/phoebe-affection-happy.gif";


class PetWindow extends Component {
    state = {
        animationState: 0,
        happiness: 0,
        energy: 0
    };

    componentDidMount() {
        this.setState({ happiness: 8, energy: 8});

        // this will likely need to have some kind of .then function - get current state from database, .then load database stat values accordingly. otherwise it will reflect default state set above and then switch.
        console.log("Happiness is currently: " + this.state.happiness);
        console.log("Energy is currently: " + this.state.energy);
    };
    
    
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>Happiness: {this.state.happiness}</h1>
                            <h1>Energy: {this.state.energy}</h1>
                        </Jumbotron>
                    </Col>
                    <Col size="md-12">
                        <img src={happy} alt="Happy Pet" />
                    </Col>
                </Row>
            </Container>
        );
    }









}









export default PetWindow;