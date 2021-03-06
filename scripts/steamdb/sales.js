'use strict';

// Show wishlisted games

GetOption( { 'steamdb-highlight': true }, function( items )
{
	if( !items[ 'steamdb-highlight' ] )
	{
		return;
	}

	var checkboxControl = document.createElement( 'div' );
	checkboxControl.className = 'steamy-checkbox-control';
	checkboxControl.id = 'js-wishlisted-only';

	var checkbox = document.createElement( 'div' );
	checkbox.className = 'steamy-checkbox';
	checkboxControl.appendChild( checkbox );

	var checkboxText = document.createElement( 'span' );
	checkboxText.className = 'steamy-checkbox-label';
	checkboxText.appendChild( document.createTextNode( 'Show wishlisted only' ) );
	checkboxControl.appendChild( checkboxText );

	var form = document.querySelector( '#currency-form' );
	form.classList.add( 'with-wishlist' );
	form.appendChild( checkboxControl );

	checkboxControl.addEventListener( 'click', function( )
	{
		var showWishlistedOnly = checkboxControl.classList.toggle( 'checked' );
		var hideOwned = document.querySelector( '#js-hide-owned-games.checked' );
		
		var elems = document.querySelectorAll( '.appimg' );
		var element;
		
		for( var i = 0; i < elems.length; i++ )
		{
			element = elems[ i ];
			
			if( showWishlistedOnly )
			{
				if( element.classList.contains( 'wished' ) )
				{
					element.hidden = false;
					element.classList.remove( 'hidden' );
				}
				else
				{
					element.hidden = true;
				}
			}
			else if( hideOwned )
			{
				if( !element.classList.contains( 'owned' ) )
				{
					element.hidden = false;
				}
			}
			else
			{
				element.hidden = false;
			}
		}
		
		// Hide empty sections
		
		[].forEach.call( document.querySelectorAll( '.table-sales tbody' ), function( el )
		{
			var section = document.querySelector( '#sales-section-' + el.dataset.section );
			section.hidden = el.clientHeight === 0 && !section.hidden;
		} );
	}, false );
} );
