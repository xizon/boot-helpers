
import $$ from '../src/_core/wrap';

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

    const sel = $$( '.app' );
    expect(Array.isArray(sel)).toBe(true);
  
  });

  it('the content of .app3 should be app3', () => {

    const content = $$( '.app' ).eq(2).text();
    expect(content).toBe('app3');
  
  });



});


