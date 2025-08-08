---
id: home
blueprint: pages
title: Home
template: home
updated_by: 030c8933-b269-4bd5-b8bc-070787bd1fef
updated_at: 1754666542
blocks:
  -
    id: me2xpwg4
    featured_post: b340ce8d-b90c-41c2-a24e-06564f2c69a7
    background_color: '#5f021f'
    type: featured_post
    enabled: true
  -
    id: me2yutvr
    content:
      -
        type: heading
        attrs:
          textAlign: center
          level: 1
        content:
          -
            type: text
            text: 'Component A: Blog overview'
    type: content
    enabled: true
  -
    id: me2xq2np
    featured_posts:
      - b340ce8d-b90c-41c2-a24e-06564f2c69a7
      - 3aaf3996-3d54-47f2-b795-a49f3a13f7f8
    type: featured_posts
    enabled: true
  -
    id: me2yv43k
    content:
      -
        type: heading
        attrs:
          textAlign: center
          level: 1
        content:
          -
            type: text
            text: 'Component B: Dynamic Cards, split content'
    type: content
    enabled: true
  -
    id: me2yl5kn
    title: 'Interactive Product Showcase'
    description: 'Experience our latest innovations with interactive features and stunning visuals'
    images:
      - screenshot_at_jan_26_15-51-46-removebg-preview.png
      - 10034227.png
    content:
      -
        type: set
        attrs:
          id: me2ym1z6
          values:
            type: accordion
            title: 'Product Features'
            content: |-
              ## Advanced Technology

              Our product features cutting-edge technology that sets it apart from the competition.

              - **Smart Integration**: Seamlessly connects with your existing systems
              - **Real-time Analytics**: Get instant insights into your data
              - **Scalable Architecture**: Grows with your business needs

              ### Performance Benefits

              Experience up to 300% faster processing times and 99.9% uptime reliability.
      -
        type: set
        attrs:
          id: me2ymzfm
          values:
            type: icon_list
            title: 'Key Benefits'
            items:
              -
                id: me2yncvn
                icon: check
                item_title: 'Easy Setup'
                description: 'Get started in minutes with our intuitive setup process'
              -
                id: me2ynma3
                icon: star
                item_title: 'Premium Support'
                description: '24/7 customer support with dedicated account managers'
              -
                id: me2ynv0z
                icon: lightning
                item_title: 'Lightning Fast'
                description: 'Optimized for speed and performance at every level'
              -
                id: me2yo3zo
                icon: heart
                item_title: 'User Friendly'
                description: 'Designed with the user experience in mind'
      -
        type: paragraph
        attrs:
          textAlign: left
    cta_text: 'Explore Blogs'
    cta_url: /blogs
    type: dynamic_cards
    enabled: true
show_title: false
---
## Welcome to your brand new Statamic site!

Not sure where to do next? Here are a few ideas, but feel free to explore in your own way, in your own time.

- [Jump into the Control Panel](/cp) and edit this page or begin setting up your own collections and blueprints.
- [Head to the docs](https://statamic.dev) and learn how Statamic works.
- [Watch some Statamic videos](https://youtube.com/statamic) on YouTube.
- [Join our Discord chat](https://statamic.com/discord) and meet thousands of other Statamic developers.
- [Start a discussion](https://github.com/statamic/cms/discussions) and get answers to your questions.
- [Star Statamic on Github](https://github.com/statamic/cms) if you enjoy using it!
