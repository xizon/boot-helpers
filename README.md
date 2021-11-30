# boot-helpers
  
A small Vanilla JS utils alternative to jQuery.


## NPM

npm i boot-helpers


[https://www.npmjs.com/package/boot-helpers](https://www.npmjs.com/package/boot-helpers)



## Installation And Test

You will need to have [node](https://nodejs.org/) setup on your machine. That will output the built distributables to `./dist/*`.


Before doing all dev stuff make sure you have `Node 14+` installed. After that, run the following code in the main directory to install the node module dependencies.

```sh
$ sudo npm install
```

Debug application. It can be checked separately as TypeScript without compiling and packaging behavior.

```sh
$ npm run check
```

To use webpack to bundle files.

```sh
$ npm run build
```

Unit Testing

```sh
$ npm run test
```

## Usage:


In a browser:
```html
<script src="boot-helpers.min.js"></script>
```

```js
__( document ).ready( function() {
	//do something
	...
});
```


In Node.js:
```js
import __ from 'boot-helpers';

__( document ).ready( function() {
	//do something
});
```


## Example:

```js

__( document ).ready( function() {
	//do something
});


__( 'body' ).loader({
	imagesSelector: 'body img',
	videosSelector: 'body video',
	startEvent: function() {
		//do something
		console.log( '=> loading.' );
	},
	progressEvent: function(percent) {
		//do something
		console.log( '=> progress: ' + percent + '%' );
	},
	endEvent: function() {
		
		console.log( '=> loaded!!!' );
		//do something
	}
});



__( document ).ready( function() {

	__( 'body' ).loader({
		imagesSelector: 'body img',
		videosSelector: 'body video',
		startEvent: function() {
			console.log( '=> loading.' );
		},
		progressEvent: function(percent) {
			console.log( '=> progress: ' + percent + '%' );
		},
		endEvent: function() {
			console.log( '=> loaded!!!' );


			//+++++++++++++++++++++++++++++++++++++++++++
			// Dom demos
			//+++++++++++++++++++++++++++++++++++++++++++
			__( '.demo' ).remove();
			__( '.demo' ).empty();
			__( '.demo' ).show();
			__( '.demo' ).hide();
			__( '.demo' ).addClass( 'class-3' );
			__( '.demo, .demo2' ).addClass( 'class-4' );
			__( '.demo' ).find( 'li' ).addClass( 'class-1 class-2' );
			__( '.demo' ).find( 'li' ).removeClass( 'class-2' );
			__( '.demo' ).find( '> .demo2' ).addClass( 'class-3' );
			__( '.demo' ).find( '> .demo2' ).find( 'li' ).addClass( 'class-3-2' );
			__( '.demo' ).closest( '.container' ).addClass( 'class-4' );
			__( '.demo' ).css({
				'background': '#f00',
				'font-size': '18px'
			});
			__( '#demo' ).css( 'background-color', '#f60' );
			__( '.demo' ).data( 'bg', 'red' );
			__( '.demo' ).attr( 'disabled', 'disabled' );
			__( '.demo' ).width( 300 );
			__( '.menu li:first-child' ).width( "50%" );
			
			if( __( '.demo' ).data( 'activated' ) === null ) {
			   //do something...
			}
			if( __( '.demo' ).attr( 'data-activated' ) === null ) {
			   //do something...
			}	

			__( '.menu li' ).eq(1).append( '<span style="color:green">after</span>');
			__( '.menu li' ).eq(1).prepend( '<span style="color:red">before</span>');
			__( '.menu li' ).first().before( '<li style="color:green">(first)before</li>');
			__( '.menu li' ).last().after( '<li style="color:red">(last)after</li>');
			__( 'h1' ).wrapInner( '<span class="new-div" />' );
			√√
			__( 'h1' ).text( 'New H1' );

			__( '.demo1' ).prev().addClass( 'prev' );
			__( '.demo2' ).next().addClass( 'next' );
			__( '.demo3' ).parent().addClass( 'parent' );
			__( '.menu' ).parents().addClass( 'all-parents' );
			__( '.demo' ).children().addClass( 'children-all' );
			__( '.class-1' ).siblings().addClass( 'class-siblings' );

			__( '.demo1' ).prev( 'ul' ).addClass( 'prev' );
			__( '.demo2' ).next( 'ul' ).addClass( 'next' );
			__( '.demo3' ).parent( 'ul' ).addClass( 'parent' );
			__( '.menu' ).parents( 'ul' ).addClass( 'all-parents' );
			__( '.demo' ).children( '.demo-children2' ).addClass( 'children-single' );
			__( '.class-1' ).siblings( 'ul' ).addClass( 'class-siblings' );


			__( '.class-1' ).not( '.class-2' ).addClass( 'class-not' );
			__( '.class-1' ).filter( '.class-2' ).addClass( 'class-filter' );
			
			__( '.demo' ).trigger( 'click' );
			__( '.demo' ).toggleClass( 'class-toggle-1 class-toggle-2' );

			
			//append HTML Element
			const htmlObject = document.createElement('div');
			htmlObject.innerHTML = '<span style="color:green">after</span>';
			__( '.menu li' ).eq(1).append( htmlObject.firstChild );

			//clone HTML Element
			const cloneHTML = __( '.uix-menu__container' ).clone();
			__( cloneHTML ).addClass( 'is-mobile' );
			__( 'body' ).prependTo( cloneHTML );
			__( 'body' ).appendTo( cloneHTML );


			
			//+++++++++++++++++++++++++++++++++++++++++++
			// Click event demos
			//+++++++++++++++++++++++++++++++++++++++++++


			__( '.menu li a' ).off( 'click' ).one( 'click', function( e ) {
				e.preventDefault();
				console.log( 'This will be clicked only once' );
			});


			__( '.menu li' ).off( 'click' ).on( 'click', function( e ) {
				console.log('e: ', e);
				console.log('this: ', this);
				console.log('index(): ', __( this ).index());
				console.log('attr(class): ', __( this ).attr( 'class' ));
				__( this ).addClass( 'new-class' )
			});

			
			__( document ).off( 'click', '.menu li' );
			__( document ).on( 'click', '.menu li', function( e ) {
				console.log('e: ', e);
				console.log('this: ', this);
				console.log('index(): ', __( this ).index());
				console.log('attr(class): ', __( this ).attr( 'class' ));
				__( this ).addClass( 'new-class' )
			});


			__( '#imghere' ).off( 'click', imgFn);
			__( '#imghere' ).on( 'click', imgFn);
			function imgFn() {
				console.log( 'imgFn' );
			}


			
			//+++++++++++++++++++++++++++++++++++++++++++
			// Retrieve data demos
			//+++++++++++++++++++++++++++++++++++++++++++
			console.log( '<h1> content: ' + __( 'h1' ).html());
			console.log( '<h1> content: ' + __( 'h1' ).text());
			console.log( 'len() of .menu li: ' + __( '.menu li' ).length );
			console.log( 'len() of #none: ' + __( '#none' ).length );
			console.log( 'width(): ' + __( '.demo' ).width() );
			console.log( 'outerWidth(): ' + __( '.demo' ).outerWidth() );
			console.log( 'outerWidth( true ): ' + __( '.demo' ).outerWidth(true) );
			
			console.log( 'height(): ' + __( '.demo' ).height() );
			console.log( 'outerHeight(): ' + __( '.demo' ).outerHeight() );
			console.log( 'outerHeight( true ): ' + __( '.demo' ).outerHeight(true) );	
			
			console.log( 'document h: ', __( document ).height() );
			console.log( 'document w: ', __( document ).width() );
			console.log( 'window h: ', __( window ).height() );			
			console.log( 'window h: ', __( window ).width() );			
			console.log( 'window scrollTop: ', __( window ).scrollTop() );			
			console.log( 'window scrollLeft: ', __( window ).scrollLeft() );	

			
			console.log( 'data: [data-bg] value: ' + __( '.demo' ).data( 'bg' ) );
			console.log( 'attr: [disabled] value: ' + __( '.demo' ).attr( 'disabled' ) );
			console.log( 'allAttrs(): ', __( '.demo' ).allAttrs() );
			
			
			console.log( __( '.demo' ).hasClass( 'class-1' ) );
			console.log( __( 'h1' ).offset() );
			console.log( __( 'h1' ).position() );		
			console.log( __( '.demo' ).maxDimension() );		
			console.log( __( '.menu li:nth-child(2)' ).index() );


			// Traverse all attribute names and values
			const allAttrs = __( '#demo' ).allAttrs();
			for (let key in allAttrs) {
				console.log( key + ' = ' + allAttrs[key] );
			}


			
			//+++++++++++++++++++++++++++++++++++++++++++
			// Loop demos
			//+++++++++++++++++++++++++++++++++++++++++++
			__( '.menu li' ).each( function( index, curSelector )  {
				console.log( index + ' : ' );
				console.log( this );
				this.style.background = '#333';
				__( this ).css({
					'background': '#f00',
					'font-size': '18px'
				});
				
				
				//Nested `each() `
				//__( curSelector) are generally used for exact each selector
				__( curSelector ).find( 'ul > li' ).each( function( index ) {
					__( this ).attr( 'id', 'li-id-' + index );
				});
	
	
				//Nested `eq()`
				for (let k = 0; k<liNum; k++) {
					__( curSelector + ' ul > li' ).eq(k).css({
						'font-size'        : '18px'
					});
					
					__( curSelector + ' ul > li:nth-child('+k+') > a' ).css({
						'font-size'        : '18px'
					});
				}

			});


			//+++++++++++++++++++++++++++++++++++++++++++
			// Animation demos
			//+++++++++++++++++++++++++++++++++++++++++++
			__( '.demo' ).fadeOut(1000, function(){
				setTimeout( function() {
					__( '.demo' ).fadeIn(3000);
				},1000 );

			});

			__( '.menu' ).animate( 'marginLeft', 0, 100, 'px', 1500, 'ease-out', function(){ console.log(this.className); } );
			__( '.menu' ).animate( 'marginTop', 0, 200, 'px', 1500, 'ease-out', function(){ console.log(this.className); } );

			
			
			//+++++++++++++++++++++++++++++++++++++++++++
			// AJAX demos
			//+++++++++++++++++++++++++++++++++++++++++++
			__.ajax({
				url: 'https://restcountries.com/v2/name/Argentina',
				method: 'GET',
				complete: function( data ) {
					console.log( '=> ajax ok!' );
					console.log( data );
				}
			});
			
			
			
			//+++++++++++++++++++++++++++++++++++++++++++
			// Form demos
			//+++++++++++++++++++++++++++++++++++++++++++
			__( '#input-name-1' ).val(  );  //form control: `<Input />`
			__( '#select-name-1' ).val( 'value-3' ); //form control: `<Select />`
			__( '#switch-name-1' ).val( true );   //form control: `<Switch />`
			__( '#checkbox-name-1' ).val( true );  //form control: `<Checkbox />`
			__('input[name="radio-name-1"]').val( 'value-3' ); //form control: `<Radio />`
			
			
			console.log( '__( val(): ' + __( '#input' ).val());

			__( '#checkbox1' ).prop('checked', true);
			console.log( '__( prop(): ' + __( '#checkbox2' ).prop( 'checked' ));	

			__( '#input' ).prop('disabled', true);


			// To send data in the application/x-www-form-urlencoded format instead
			const formData = new FormData();
			const defaultPostData = {
				action  : 'load_singlepages_ajax_content'
			};
			for(let k in defaultPostData) {
				formData.append(k, defaultPostData[k]);
			}

			// For multiple form fields data acquisition
			const oldFormData = __( '#form' ).serializeArray();  
			oldFormData.forEach(function(item){
				formData.append(item.name, item.value);
			});



			//+++++++++++++++++++++++++++++++++++++++++++
			// Utilities demos
			//+++++++++++++++++++++++++++++++++++++++++++
			console.log( __.isTouchCapable() );  //true or false
			console.log( __.browser.isIE );  //.isMobile, .isAndroid, .isPC, .isSafari, .isIE, .supportsPassive
			console.log( __.GUID.create() );
			console.log( __.math.evaluate( '100/3' ) );
			console.log( __.math.getRandomFloat(1, 10) );
			console.log( __.math.getDegree(135) );
			console.log( __.math.getRadian(1) );
			console.log( __.math.getPolarCoord(10,30,0) );
			console.log( __.cssProperty.getAbsoluteCoordinates( __( '.col-12' )[0] ).left );
			console.log( __.cssProperty.getTransitionDuration( __( '.col-12' )[0] ) );
			console.log( __.styleFormat( 'font-size: 10px;background: #51B801; color:#fff; border-radius: 5px;padding: 2px 3px;display: inline-block;margin-left: 3px;' ) )
			console.log( __.trim( 'string string spacing string' ) );
            console.log( __.lastUrlParamFormat( 'string-string-spacing_string' ) );
			console.log( __.removeFirstLastStr( ',string,string,string,' ) );
			console.log( __.toSlug( 'string String2-s' ) );
			console.log( __.htmlEncode( '<span style="color:red">text</span>' ) );
			console.log( __.htmlDecode( '&lt;span style="color:red"&gt;text&lt;/span&gt;' ) );



			console.log( __.validate.isMobile( '13167678787' ) ); //true
			console.log( __.validate.isTel( '123-456-7890' ) ); //true
			console.log( __.validate.isEmail( 'name@gmail.com' ) );	 //true
			console.log( __.validate.isNumber( '1421.231' ) );	//true
			console.log( __.validate.isInt( '1421.231' ) ); //false		
			console.log( __.validate.isJSON( '{"a":true}' ) ); //true	
			
			// Scroll spy
			const throttleFunc = __.throttle(myFunc, 300);
			window.removeEventListener('scroll', throttleFunc);
			window.removeEventListener('touchmove', throttleFunc);
			window.addEventListener('scroll', throttleFunc);
			window.addEventListener('touchmove', throttleFunc);

			// Click spy
			const debounceFunc = __.debounce(myFunc, 300);
			function handleClick() {
			    debounceFunc();
			}	

			// Window spy
			const debounceFuncWindow = __.debounce(windowUpdate, 50);
			window.removeEventListener('resize', debounceFuncWindow);
			window.addEventListener('resize', debounceFuncWindow);


			// Deep clone an element
			let a = [1,2,3,4], b = __.deepClone(a);
			let demo = document.querySelector( '#demo' ), demoCopy = __.deepClone(demo);


			// Set a default configuration
			function myFun(curElement, config) {
				if ( typeof curElement === typeof undefined ) return;
				config = __.setDefaultOptions({
					"src"          : false,
					"htmlID"       : false,
					"fixed"        : false,
					"ajax"         : false
				}, config);

				console.log( config ); //{src: 'https://google.com', htmlID: true, fixed: false, ajax: false}

			}
			myFun( __( '.demo-trigger' ), {
				src: 'https://google.com',
				htmlID: true
			});



		}
	});



});
```



## Licensing

Licensed under the [MIT](https://opensource.org/licenses/MIT).

