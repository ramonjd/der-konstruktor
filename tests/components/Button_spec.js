import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithTag, Simulate } from 'react-addons-test-utils'
import { expect, assert } from 'chai'
import Button from '../../src/components/Button'

describe('Button', () => {


    let someVar
    const onClick = () => {
        someVar = 'else'
    }


    const component = renderIntoDocument(
        <Button className="myButton" title="TEEM" onClick={ onClick }>Yo</Button>
    )


    it('renders button ', () => {
        const button = findRenderedDOMComponentWithTag(component, 'button')
        expect(button.textContent).to.contain('Yo')
        expect(button.getAttribute('title')).to.equal('TEEM')
        expect(button.className).to.contain('myButton')
        Simulate.click(button)
        expect(someVar).to.equal('else')
    })

})