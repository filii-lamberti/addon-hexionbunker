ARG BUILD_FROM=hassioaddons/base:8.0.5
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Copy root filesystem
COPY rootfs/etc /etc/
COPY \
    rootfs/opt/hexionbunker/package.json \
    rootfs/opt/hexionbunker/yarn.lock \
    /opt/hexionbunker/

# Setup base
# hadolint ignore=DL3003
RUN \
    apk add --no-cache --virtual .build-dependencies \
        npm=12.18.4-r0 \
        yarn=1.22.4-r0 \
    \
    && apk add --no-cache \
        nodejs=14.18.1-r0 \
    \
    && cd /opt/hexionbunker \
    \
    && yarn global add modclean \
    && yarn --production \
    \
    && modclean \
        --path /opt/hexionbunker \
        --no-progress \
        --keep-empty \
        --run \
    \
    && yarn global remove modclean \
    && yarn cache clean \
    \
    && apk del --no-cache --purge .build-dependencies

COPY rootfs/opt/hexionbunker/public /opt/hexionbunker/public/
COPY rootfs/opt/hexionbunker/app.js /opt/hexionbunker/

# Build arugments
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION

# Labels
LABEL \
    io.hass.name="HexionBunker" \
    io.hass.description="A HexionBunker add-on for Home Assistant" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="Jorim Tielemans <tielemans.jorim@gmail.com>" \
    org.label-schema.description="A HexionBunker add-on for Home Assistant" \
    org.label-schema.build-date=${BUILD_DATE} \
    org.label-schema.name="HexionBunker" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.url="https://addons.community" \
    org.label-schema.usage="https://gitlab.com/filii-lamberti/addon-hexionbunker" \
    org.label-schema.vcs-ref=${BUILD_REF} \
    org.label-schema.vcs-url="https://gitlab.com/filii-lamberti/filii-addons" \
    org.label-schema.vendor="Filii Lamberti"
