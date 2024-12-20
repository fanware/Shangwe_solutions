!function(e,t){"use strict";let o={init:function(){let i={"jet-single-images.default":o.widgetProductImages,"jet-single-add-to-cart.default":o.widgetSingleAddToCart,"jet-woo-builder-archive-add-to-cart.default":o.widgetArchiveAddToCart,"jet-single-tabs.default":o.widgetProductTabs,"jet-woo-products.default":o.widgetProductsGrid,"jet-woo-products-list.default":o.widgetProductsList,"jet-woo-categories.default":o.widgetCategories,"jet-cart-table.default":o.widgetCartTable,"jet-woo-builder-products-loop.default":o.widgetProductsLoop};e.each(i,function(e,o){t.hooks.addAction("frontend/element_ready/"+e,o)}),t.hooks.addFilter("jet-popup/widget-extensions/popup-data",o.prepareJetPopup),e(window).on("jet-popup/render-content/ajax/success",o.jetPopupLoaded),e(document).on("wc_update_cart added_to_cart",o.handleJetPopupWithWCEvents).on("jet-filter-content-rendered",function(e,t){o.widgetProductsGrid(t),o.handleInputQuantityValue(t)}).on("click.JetWooBuilder",".jet-woo-item-overlay-wrap",o.handleListingItemClick)},commonInit:function(){if(window.jetWooBuilderData.single_ajax_add_to_cart){e(".woocommerce div.product").hasClass("product-type-external")||e(document).on("click.JetWooBuilder",".single_add_to_cart_button:not(.disabled)",o.singleProductAjaxAddToCart)}-1!==navigator.userAgent.indexOf("Safari")&&-1===navigator.userAgent.indexOf("Chrome")&&document.addEventListener("click",function(e){e.target.matches(".add_to_cart_button .button-text")&&e.target.parentNode.focus(),(e.target.matches(".add_to_cart_button")||e.target.matches(".single_add_to_cart_button"))&&e.target.focus()}),e(document.body).bind("country_to_state_changing",function(e,t,i){setTimeout(function(){o.setAddressFieldsRequiredValidation(i)},500)})},setAddressFieldsRequiredValidation:function(t){let i=t.closest(".elementor-element"),n=o.getElementorElementSettings(i);if(n&&n.modify_field){let i=e.parseJSON(wc_address_i18n_params.locale_fields);i&&e.each(i,function(i,n){let a=n.split(",");e.each(a,function(e,i){let n=t.find(i.trim());n.length&&(n.hasClass("jwb-field-required")?o.fieldIsRequired(n,!0):n.hasClass("jwb-field-optional")&&o.fieldIsRequired(n,!1))})})}},fieldIsRequired:function(e,t){o.modifyFieldLabelWhitespace(e),t?(e.find("label .optional").remove(),e.addClass("validate-required"),0===e.find("label .required").length&&e.find("label").append('&nbsp;<abbr class="required" title="'+wc_address_i18n_params.i18n_required_text+'">*</abbr>')):(e.find("label .required").remove(),e.removeClass("validate-required woocommerce-invalid woocommerce-invalid-required-field"),0===e.find("label .optional").length&&e.find("label").append('&nbsp;<span class="optional">('+wc_address_i18n_params.i18n_optional_text+")</span>"))},modifyFieldLabelWhitespace:function(e){let t=e.find("label").html();t&&e.find("label").html(t.replace(/&nbsp;/g,"").trim())},widgetProductsLoop:function(t){let i=o.getElementorElementSettings(t);if(i&&i.switcher_enable){let n=t.find(".jet-woo-products-wrapper");t.find(".jet-woo-switcher-controls-wrapper .jet-woo-switcher-btn").on("click.JetWooBuilder",function(t){t.preventDefault();let a,d=e(this),r=d.hasClass("jet-woo-switcher-btn-main")?i.main_layout:i.secondary_layout;window.JetSmartFilters&&window.JetSmartFilters.filterGroups["woocommerce-archive/default"]&&(a=window.JetSmartFilters.filterGroups["woocommerce-archive/default"].query),n.addClass("jet-layout-loading"),e.ajax({type:"POST",url:window.jetWooBuilderData.ajax_url,data:{action:"jet_woo_builder_get_layout",query:window.jetWooBuilderData.products,layout:r,filters:a}}).done(function(t){n.removeClass("jet-layout-loading"),n.html(t.data.html),o.elementorFrontendInit(n),d.hasClass("active")||(d.addClass("active"),d.siblings().removeClass("active")),e(document).trigger("jet-woo-builder-content-rendered",[this,t])})})}},handleInputQuantityValue:function(t){let i=t.closest(".elementor-widget"),n=o.getElementorElementSettings(i);if(n&&"yes"===n.show_quantity){t.find("form.cart").on("change","input.qty",function(){"0"!==this.value||e(this.form).hasClass("grouped_form")||(this.value="1");let t=e(this.form).find("button[data-quantity]");t.attr("data-quantity",this.value),this.max&&(+this.value>+this.max?t.removeClass("ajax_add_to_cart"):t.hasClass("ajax_add_to_cart")||t.addClass("ajax_add_to_cart"))})}},jetPopupLoaded:function(t,o){if(!o.data.isJetWooBuilder)return;let i=e("#"+o.data.popupId);setTimeout(function(){e(window).trigger("resize"),i.addClass("woocommerce product single-product quick-view-product"),i.find(".jet-popup__container-content").addClass("product"),e(".jet-popup .variations_form").each(function(){e(this).wc_variation_form()}),e(".jet-popup .woocommerce-product-gallery.images").each(function(){e(this).wc_product_gallery()})},500)},prepareJetPopup:function(t,o,i,n){if(o["is-jet-woo-builder"]){let a;t.isJetWooBuilder=!0,t.templateId=o["jet-woo-builder-qv-template"],(a=i.hasClass("elementor-widget-jet-woo-products")||i.hasClass("elementor-widget-jet-woo-products-list")?e(n.target).parents(".jet-woo-builder-product"):i.parents(".jet-woo-builder-product")).length&&(t.productId=a.data("product-id"))}return t},widgetProductImages:function(t){t.find(".jet-single-images__loading").remove(),e("body").hasClass("single-product")||t.find(".woocommerce-product-gallery").each(function(){e(this).wc_product_gallery()})},widgetSingleAddToCart:function(t){e("body").hasClass("single-product")||"undefined"!=typeof wc_add_to_cart_variation_params&&t.find(".variations_form").each(function(){e(this).wc_variation_form()})},widgetArchiveAddToCart:function(e){o.handleInputQuantityValue(e)},widgetProductTabs:function(t){if(t.find(".jet-single-tabs__loading").remove(),e("body").hasClass("single-product"))return;let o=window.location.hash,i=window.location.href,n=t.find(".wc-tabs, ul.tabs").first();n.find("a").addClass("elementor-clickable"),t.find(".wc-tab, .woocommerce-tabs .panel:not(.panel .panel)").hide(),o.toLowerCase().indexOf("comment-")>=0||"#reviews"===o||"#tab-reviews"===o?n.find("li.reviews_tab a").trigger("click"):i.indexOf("comment-page-")>0||i.indexOf("cpage=")>0?n.find("li.reviews_tab a").trigger("click"):"#tab-additional_information"===o?n.find("li.additional_information_tab a").trigger("click"):n.find("li:first a").trigger("click")},widgetProductsGrid:function(e){o.handleInputQuantityValue(e);let t=e.find(".jet-woo-carousel"),i=e.find(".jet-woo-products"),n=i.data("mobile-hover"),a=i.find(".jet-woo-products__item"),d=a.find(".jet-woo-products-cqw-wrapper"),r=a.find(".hovered-content"),l=!1,s=!1;d.length>0&&d.html().trim().length>0&&(l=!0),r.length>0&&r.html().trim().length>0&&(s=!0),(l||s)&&n&&o.mobileHoverOnTouch(a,".jet-woo-product-thumbnail"),t.length&&o.initCarousel(t,t.data("slider_options"))},widgetProductsList:function(e){o.handleInputQuantityValue(e)},widgetCategories:function(e){let t=e.find(".jet-woo-carousel"),i=e.find(".jet-woo-categories"),n=i.data("mobile-hover"),a=i.find(".jet-woo-categories__item"),d=a.find(".jet-woo-category-count");(i.hasClass("jet-woo-categories--preset-2")&&d.length>0||i.hasClass("jet-woo-categories--preset-3"))&&n&&o.mobileHoverOnTouch(a,".jet-woo-category-thumbnail"),t.length&&o.initCarousel(t,t.data("slider_options"))},mobileHoverOnTouch:function(t,i){void 0!==window.ontouchstart&&t.each(function(){let t=e(this),n=t.find(i+" a"),a=t.siblings();if(t.hasClass("jet-woo-products__item")){t.not(i).each(function(){let i=e(this);o.mobileTouchEvent(t,i,a)})}o.mobileTouchEvent(t,n,a)})},mobileTouchEvent:function(t,o,i){o.on("click",function(o){t.hasClass("mobile-hover")||(o.preventDefault(),i.each(function(){e(this).hasClass("mobile-hover")&&e(this).removeClass("mobile-hover")}),t.addClass("mobile-hover"))})},initCarousel:function(i,n){let a=i.closest(".elementor-widget"),d=i.find(".swiper-slide").length,r=o.getElementorElementSettings(a),l=window.elementorFrontend.config.responsive.activeBreakpoints,s={},c=+r.columns||4,u=r.slides_overflow_enabled&&r.slides_overflow?+r.slides_overflow:0,p=void 0!==r.space_between_slides?+r.space_between_slides:10,w={mobile:1,tablet:2};(s={slidesPerView:c+u,spaceBetween:p,crossFade:"fade"===n.effect,handleElementorBreakpoints:!0}).breakpoints={};let f=c;if(Object.keys(l).reverse().forEach(e=>{const t=w[e]?w[e]:f,o=+r["columns_"+e]||t,i=r.slides_overflow_enabled&&r["slides_overflow_"+e]?+r["slides_overflow_"+e]:u;s.breakpoints[l[e].value]={slidesPerView:o+i,slidesPerGroup:+r["slides_to_scroll_"+e]||n.slidesPerGroup,spaceBetween:void 0!==r["space_between_slides_"+e]?+r["space_between_slides_"+e]:p},f=+r["columns_"+e]||t}),n.paginationEnable&&(s.pagination={el:".swiper-pagination",clickable:!0,dynamicBullets:n.dynamicBullets}),n.navigationEnable&&(s.navigation={nextEl:".jet-swiper-button-next",prevEl:".jet-swiper-button-prev"}),d>(+r["columns_"+t.getCurrentDeviceMode()]||+r.columns)){new(0,t.utils.swiper)(i,e.extend({},s,n)).then(t=>{e(document).trigger("jet-woo-builder-swiper-initialized",t),"vertical"===n.direction&&n.paginationEnable&&n.dynamicBullets&&i.find(".swiper-pagination").css("width",i.find(".swiper-pagination-bullet-active").width())}),i.find(".jet-arrow").show()}else"vertical"===n.direction?(i.addClass("swiper-container-vertical"),i.find(".jet-arrow").hide()):i.find(".jet-arrow").hide()},handleJetPopupWithWCEvents:function(t,o,i,n){let a=e(n).closest(".jet-popup");a.length&&a.hasClass("quick-view-product")&&e(window).trigger({type:"jet-popup-close-trigger",popupData:{popupId:a.attr("id"),constantly:!1}});let d=e(n).closest("[data-purchase-popup-id]");if(d.length){let t=d.data("purchase-popup-id");t&&e(window).trigger({type:"jet-popup-open-trigger",popupData:{popupId:"jet-popup-"+t}})}},widgetCartTable:function(t){if(t.find(".cart-collaterals").filter(function(){return 0===e(this).children().length}).hide(),"yes"===o.getElementorElementSettings(t).cart_update_automatically){let t;e(".woocommerce").on("change","input.qty",function(){void 0!==t&&clearTimeout(t),t=setTimeout(function(){e('[name="update_cart"]').trigger("click")},300)})}},singleProductAjaxAddToCart:function(t){t&&t.preventDefault();let o=e(this).closest("form");if(!o[0].checkValidity())return o[0].reportValidity(),!1;let i=e(this),n=i.val()||"",a=o.serialize();return e.ajax({type:"POST",url:window.jetWooBuilderData.ajax_url,data:"action=jet_woo_builder_add_cart_single_product&add-to-cart="+n+"&"+a,beforeSend:function(){i.removeClass("added").addClass("loading")},complete:function(){i.addClass("added").removeClass("loading")},success:function(t){t&&(t.error&&t.product_url?window.location=t.product_url:"undefined"!=typeof wc_add_to_cart_params&&(e(document.body).trigger("wc_fragment_refresh"),e(document.body).trigger("added_to_cart",[t.fragments,t.cart_hash,i]),e(".woocommerce-notices-wrapper").html(t.fragments.notices_html)))}}),!1},handleListingItemClick:function(t){let o=e(this).data("url"),i=e(this).data("target")||!1;if(o){if(t.preventDefault(),window.elementorFrontend&&window.elementorFrontend.isEditMode()||e(t.target).parents(".jet-compare-button__link").length||e(t.target).parents(".jet-wishlist-button__link").length||e(t.target).parents(".jet-quickview-button__link").length)return;if("_blank"===i)return void window.open(o);window.location=o}},getElementorElementSettings:function(e){return window.elementorFrontend&&window.elementorFrontend.isEditMode()&&e.hasClass("elementor-element-edit-mode")?o.getEditorElementSettings(e):e.data("settings")||{}},getEditorElementSettings:function(e){let t,o=e.data("model-cid");return o&&window.elementorFrontend.hasOwnProperty("config")&&window.elementorFrontend.config.hasOwnProperty("elements")&&window.elementorFrontend.config.elements.hasOwnProperty("data")&&(t=window.elementorFrontend.config.elements.data[o])?t.toJSON():{}},elementorFrontendInit:function(t){t.find("[data-element_type]").each(function(){let t=e(this),o=t.data("element_type");o&&("widget"===o&&(o=t.data("widget_type"),window.elementorFrontend.hooks.doAction("frontend/element_ready/widget",t,e)),window.elementorFrontend.hooks.doAction("frontend/element_ready/global",t,e),window.elementorFrontend.hooks.doAction("frontend/element_ready/"+o,t,e))})}};e(window).on("elementor/frontend/init",o.init),o.commonInit(),window.JetWooBuilder=o}(jQuery,window.elementorFrontend);