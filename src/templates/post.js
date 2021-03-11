import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import 'moment/locale/ru';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import {withPrefix, htmlToReact} from '../utils';

moment.locale('ru');

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Post extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
            <section className="post">
                {_.get(this.props, 'pageContext.frontmatter.content_img_path', null) && (
                <img className="header-image" src={withPrefix(_.get(this.props, 'pageContext.frontmatter.content_img_path', null))} alt={_.get(this.props, 'pageContext.frontmatter.content_img_alt', null)}/>
                )}
                <header className="hero">
                    <div className="copy">
                        <h1>{_.get(this.props, 'pageContext.frontmatter.title', null)}</h1>
                        {_.get(this.props, 'pageContext.frontmatter.subtitle', null) && (
                        <h3>{htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle', null))}</h3>
                        )}
                        <h3 className="publish-date">{moment(_.get(this.props, 'pageContext.frontmatter.date', null)).strftime('%A, %e %B %Y')}</h3>
                    </div>
                </header>
                <div className="content">
                    <p>{_.get(this.props, 'pageContext.frontmatter.excerpt', null)}</p>
                    <div className="article-teaser">
<a hfre={_.get(this.props, 'pageContext.frontmatter.thumb_img_path', null)} className="thumbnail logo"><img class="thumbnail" src={_.get(this.props, 'pageContext.frontmatter.thumb_img_path', null)} alt={_.get(this.props, 'pageContext.frontmatter.thumb_img_alt', null)}/>
<p><a href={_.get(this.props, 'pageContext.frontmatter.article_pdf_path', null)}>Скачать в формате <code>pdf</code></a></p>
<p><a href={_.get(this.props, 'pageContext.frontmatter.article_txt_path', null)}>Скачать в формате <code>txt</code></a></p>
</div>
                    {htmlToReact(_.get(this.props, 'pageContext.html', null))}
                </div>
            </section>
            </Layout>
        );
    }
}
