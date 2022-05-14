import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Form, Label, Input, FormGroup, Row, Col, FormFeedback, FormText } from 'reactstrap'
import _ from 'lodash'

const Modal = () => {

}
class ModalEditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            password: '',
            errors: {},
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentUser !== prevProps.currentUser) {
            let user = this.props.currentUser
            if (user && !_.isEmpty(user)) {
                const { firstName, lastName, address, email, id } = user
                this.setState({
                    id: id,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    address: address
                })
            }
        }
    }

    showModal() {
        this.setState({
            isModalOpen: true
        });
    }

    toggle() {
        this.props.toggleFromParent()
    }

    // good code
    handleOnChangeInput(e, id) {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({ ...copyState })
    }

    handleSaveUser() {
        if (this.validate()) {
            this.props.editUser(this.state)
        }
        else {
            console.log('validate Not success!')
        }
    }

    handleInput(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: e.target.value,
        })
    }

    resetModalData = () => {
        this.setState({
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            password: '',
            confirmPassword: '',
            errors: {},
        })
    }

    validate = () => {
        const { firstName, lastName, address } = this.state
        const errors = {}

        if (firstName === '') {
            errors.firstName = "Required"
        }
        if (lastName === '') {
            errors.lastName = "Required"
        }
        if (address === '') {
            errors.address = "Required"
        }
        this.setState({ errors: errors })
        if (Object.keys(errors).length > 0) return false
        return true
    }

    render() {
        console.log('state', this.state)
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={() => this.toggle()} style={{ maxWidth: '60%' }} >
                    <ModalHeader toggle={() => this.toggle()} className="text-2xl">
                        Edit User
                    </ModalHeader>
                    <ModalBody>
                        <Form className="create-user-form">
                            <Row form>
                                <Row className="mb-4">
                                    <Col xs={6}>
                                        <FormGroup>
                                            <Label for="exampleEmail">
                                                Email:
                                            </Label>
                                            <Input
                                                id="exampleEmail"
                                                name="email"
                                                placeholder="ngoctien@gmail.com"
                                                type="email"
                                                onChange={(e) => this.handleInput(e, 'email')}
                                                disabled
                                                value={this.state.email}
                                            />
                                            <p className="text-red-600">{this.state.errors.email}</p>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-4">
                                    <Col xs={6}>
                                        <FormGroup>
                                            <Label for="examplePassword">
                                                Password:
                                            </Label>
                                            <Input
                                                id="examplePassword"
                                                name="password"
                                                placeholder="***********"
                                                type="password"
                                                disabled
                                                value={this.state.password}
                                                onChange={(e) => this.handleInput(e, 'password')}

                                            />
                                            <p className="text-red-600">{this.state.errors.password}</p>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row className="mb-4">
                                    <Col xs={6}>
                                        <FormGroup>
                                            <Label for="exampleFirstName">
                                                First Name:
                                            </Label>
                                            <Input
                                                id="exampleFirstName"
                                                name="firstName"
                                                placeholder="First Name"
                                                value={this.state.firstName}
                                                onChange={(e) => this.handleInput(e, 'firstName')}

                                            />
                                            <p className="text-red-600">{this.state.errors.firstName}</p>
                                        </FormGroup>
                                    </Col>
                                    <Col xs={6}>
                                        <FormGroup>
                                            <Label for="exampleLastName">
                                                Last Name:
                                            </Label>
                                            <Input
                                                id="exampleLastName"
                                                name="lastName"
                                                placeholder="Last Name"
                                                value={this.state.lastName}
                                                onChange={(e) => this.handleInput(e, 'lastName')}
                                            />
                                            <p className="text-red-600">{this.state.errors.lastName}</p>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="exampleAddress">
                                                Address:
                                            </Label>
                                            <Input
                                                id="exampleAddress"
                                                name="address"
                                                placeholder="12/2 duong so 16, Linh Trung, Thu Duc"
                                                value={this.state.address}
                                                onChange={(e) => this.handleInput(e, 'address')}
                                            />
                                            <p className="text-red-600">{this.state.errors.address}</p>

                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.handleSaveUser()}
                        >
                            Save
                        </Button>

                        <Button onClick={() => this.toggle()}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser)
