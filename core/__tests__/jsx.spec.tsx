import { NimbusJSX, RootState, Component, WithChildren, setFragmentFactory } from 'src'
import { coreNamespace } from 'src/constants'
import { nimbusFragmentFactory } from 'src/jsx/structure'
import { omitUndefined } from './utils'

describe('JSX', () => {
  describe('General JSX tests', () => {
    it('should create component', () => {
      const component = (
        <component name="comp" namespace="test" state={new RootState('stt')} id="01" properties={{ prop: 1 }} />
      )
      expect(component).toBeInstanceOf(Component)
      expect(component).toEqual({
        _type: 'component',
        name: 'comp',
        namespace: 'test',
        state: new RootState('stt'),
        id: '01',
        properties: { prop: 1 },
      })
    })

    it('should create component with one child', () => {
      const component = (
        <component name="comp">
          <component name="another" />
        </component>
      )
      expect(component).toEqual({
        _type: 'component',
        name: 'comp',
        children: {
          _type: 'component',
          name: 'another',
        },
      })
    })

    it('should create component with multiple children', () => {
      const component = (
        <component name="comp">
          <component name="another" />
          <component name="another" />
        </component>
      )
      expect(component).toEqual({
        _type: 'component',
        name: 'comp',
        children: [
          { _type: 'component', name: 'another' },
          { _type: 'component', name: 'another' },
        ],
      })
    })

    it('should throw error when an invalid intrinsic component is used', () => {
      // @ts-ignore
      expect(() => <blah />).toThrow()
    })

    it('should use functional component', () => {
      interface MyFCProps extends WithChildren {
        prop1: string,
        prop2: number,
      }

      const MyFC = ({ prop1, prop2, children }: MyFCProps) => (
        <component name="test" properties={{ prop1, prop2 }}>
          {children}
        </component>
      )

      const myFC = <MyFC prop1="hello" prop2={5}><component name="child" /></MyFC>
      expect(myFC).toBeInstanceOf(Component)
      expect(myFC).toEqual({
        _type: 'component',
        name: 'test',
        properties: { prop1: 'hello', prop2: 5 },
        children: { _type: 'component', name: 'child' },
      })
    })

    it('should use string as functional component child', () => {
      interface TextProps {
        children: string,
      }

      const Text = ({ children }: TextProps) => (
        <component name="text" properties={{ value: children }} />
      )

      const text = <Text>hello world!</Text>
      expect(text).toEqual({
        _type: 'component',
        name: 'text',
        properties: { value: 'hello world!' },
      })
    })

    it('should use function as functional component child', () => {
      interface MyFCProps {
        children: () => Component,
      }

      const MyFC = ({ children }: MyFCProps) => (
        <component name="test" properties={{ fallback: children() }} />
      )

      const text = <MyFC>{() => <component name="child" />}</MyFC>
      expect(omitUndefined(text)).toEqual({
        _type: 'component',
        name: 'test',
        properties: { fallback: { _type: 'component', name: 'child' } },
      })
    })
  })

  describe('Fragments', () => {
    it('should create the component Fragment', () => {
      const component = <><component name="test1" /><component name="test2" /></>
      expect(component).toBeInstanceOf(Component)
      expect(omitUndefined(component)).toEqual({
        _type: 'component',
        name: 'fragment',
        namespace: coreNamespace,
        children: [{ _type: 'component', name: 'test1' }, { _type: 'component', name: 'test2' }],
      })
    })

    it('should replace Fragment behavior', () => {
      setFragmentFactory(children => new Component({ name: 'my-fragment', children }))
      const component = <><component name="test" /></>
      expect(component).toBeInstanceOf(Component)
      expect(component).toEqual({
        _type: 'component',
        name: 'my-fragment',
        children: { _type: 'component', name: 'test' },
      })
      setFragmentFactory(nimbusFragmentFactory)
    })
  })
})
