
import __ from '../src/index';

beforeAll(() => {
  document.body.innerHTML = `
    <div id="demo">text</div>
    <div class="app app1">app1</div>
    <div class="app app2">app2</div>
    <div class="app app3">app3</div>
    <div class="app app4">app4</div>
  `

});

describe('dom', () => {

  it('the node return value should be an array', () => {

    const sel = __( '.app' );
    expect(Array.isArray(sel)).toBe(false);
    expect(Object.prototype.toString.call(sel) === "[object Object]").toBe(true);
  
  });

  it('the content of .app3 should be app3', () => {

    const content = __( '.app' ).eq(2).text();
    expect(content).toBe('app3');
  
  });



});


