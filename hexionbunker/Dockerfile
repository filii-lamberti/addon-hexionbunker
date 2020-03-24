ARG BUILD_FROM=hassioaddons/base:7.0.4
# hadolint ignore=DL3006
FROM ${BUILD_FROM}

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

# Copy root filesystem
COPY rootfs /

# Setup base
# hadolint ignore=DL3003
RUN \
    apk add --no-cache --virtual .build-dependencies \
        build-base=0.5-r1 \
        python2=2.7.16-r3 \
    \
    && apk add --no-cache \
        nodejs=12.15.0-r1 \
        npm=12.15.0-r1 \
    \
    && cd /opt/hexionbunker \
    \
    && npm install \
        --no-optional \
        --only=production \
    \
    && npm cache clear --force \
    \
    && apk del --no-cache --purge .build-dependencies

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