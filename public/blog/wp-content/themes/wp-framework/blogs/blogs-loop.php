<?php
/**
 * BuddyPress Template: Blogs Loop
 *
 * This template displays the BuddyPress blogs loop.
 *
 * @package WP Framework
 * @subpackage Template
 */
?>

<?php do_action( 'bp_before_blogs_loop' ); ?>

<?php if ( bp_has_blogs( bp_ajax_querystring( 'blogs' ) ) ) : ?>

	<div id="pag-top" class="pagination">

		<div class="pag-count" id="blog-dir-count-top">
			<?php bp_blogs_pagination_count(); ?>
		</div><!-- #blog-dir-count-top .pag-count -->

		<div class="pagination-links" id="blog-dir-pag-top">
			<?php bp_blogs_pagination_links(); ?>
		</div><!-- #blog-dir-pag-top .pagination-links -->

	</div><!-- #page-top .pagination -->

	<?php do_action( 'bp_before_directory_blogs_list' ); ?>

	<ul id="blogs-list" class="item-list">
	<?php while ( bp_blogs() ) : bp_the_blog(); ?>

		<li>
			<div class="item-avatar">
				<a href="<?php bp_blog_permalink(); ?>"><?php bp_blog_avatar('type=thumb'); ?></a>
			</div><!-- .item-avatar -->

			<div class="item">
				<div class="item-title"><a href="<?php bp_blog_permalink(); ?>"><?php bp_blog_name(); ?></a></div><!-- .item-title -->
				<div class="item-meta"><span class="activity"><?php bp_blog_last_active(); ?></span></div><!-- .item-meta -->

				<?php do_action( 'bp_directory_blogs_item' ); ?>
			</div><!-- .item -->

			<div class="action">

				<?php do_action( 'bp_directory_blogs_actions' ); ?>

				<div class="meta">
					<?php bp_blog_latest_post(); ?>
				</div><!-- .meta -->

			</div><!-- .action -->

			<div class="clear"></div>
		</li>

	<?php endwhile; ?>
	</ul><!-- #blogs-list .item-list -->

	<?php do_action( 'bp_after_directory_blogs_list' ); ?>

	<?php bp_blog_hidden_fields(); ?>

	<div id="pag-bottom" class="pagination">

		<div class="pag-count" id="blog-dir-count-bottom">
			<?php bp_blogs_pagination_count(); ?>
		</div><!-- #blog-dir-count-bottom .pag-count -->

		<div class="pagination-links" id="blog-dir-pag-bottom">
			<?php bp_blogs_pagination_links(); ?>
		</div><!-- #blog-dir-pag-bottom .pagination-links -->

	</div><!-- #pag-bottom .pagination -->

<?php else: ?>

	<?php wpf_message( __( 'Sorry, there were no blogs found.', t() ), 'info' ); ?>

<?php endif; ?>

<?php do_action( 'bp_after_blogs_loop' ); ?>
