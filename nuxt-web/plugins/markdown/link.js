const indexRE = /(.*)(index|readme).md(#?.*)$/i

module.exports = (md, externalAttrs) => {
  let hasOpenRouterLink = false
  let hasOpenExternalLink = false

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    if (hrefIndex >= 0) {
      const link = token.attrs[hrefIndex]
      const href = link[1]
      const isExternal = /^https?:/.test(href)
      const isSourceLink = /(\/|\.md|\.html)(#.*)?$/.test(href)
      if (isExternal) {
        Object.entries(externalAttrs).forEach(([key, val]) => {
          token.attrSet(key, val)
        })
        if (/_blank/i.test(externalAttrs.target)) {
          hasOpenExternalLink = true
        }
      } else if (isSourceLink) {
        hasOpenRouterLink = true
        tokens[idx] = toRouterLink(token, link)
      }
    }
    return self.renderToken(tokens, idx, options)
  }

  function toRouterLink(token, link) {
    link[0] = 'to'
    let to = link[1]

    // convert link to filename and export it for existence check
    const links = md.$data.links || (md.$data.links = [])
    links.push(to)

    const indexMatch = to.match(indexRE)
    if (indexMatch) {
      const [, path, , hash] = indexMatch
      to = path + hash
    } else {
      to = to.replace(/\.md$/, '.html').replace(/\.md(#.*)$/, '.html$1')
    }

    // relative path usage.
    if (!to.startsWith('/')) {
      to = ensureBeginningDotSlash(to)
    }

    // markdown-it encodes the uri
    link[1] = decodeURI(to)

    // export the router links for testing
    const routerLinks = md.$data.routerLinks || (md.$data.routerLinks = [])
    routerLinks.push(to)

    return Object.assign({}, token, {
      tag: 'router-link'
    })
  }

  md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (hasOpenRouterLink) {
      token.tag = 'router-link'
      hasOpenRouterLink = false
    }
    if (hasOpenExternalLink) {
      hasOpenExternalLink = false
      // add OutBoundLink to the beforeend of this link if it opens in _blank.
      const svg =
        "<svg viewBox='0 0 70 36'><path d='M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527' /></svg>"
      return svg + '<OutboundLink/>' + self.renderToken(tokens, idx, options)
    }
    return self.renderToken(tokens, idx, options)
  }
}

const beginningSlashRE = /^\.\//

function ensureBeginningDotSlash(path) {
  if (beginningSlashRE.test(path)) {
    return path
  }
  return './' + path
}
